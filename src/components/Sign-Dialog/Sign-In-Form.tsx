'use client'

import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import ErrorMessage from '@/components/Error-Message'
import SimpleAlertDialogue from '@/components/Alert-Dialogs/Simple-Alert-Dialog'

import { signIn } from '@/services/firebase'
import SimpleErrorAlertDialog from '../Alert-Dialogs/Simple-Error-Alert-Dialog'
import { useSetRecoilState } from 'recoil'
import { IUser } from '@/models/User'
import { loggedInUser } from '@/recoil/atom'

interface SignInFormProps {
    buttonAction?: () => void
    loginFunction?: (user: IUser) => void
}

const SignInForm = ({ buttonAction, loginFunction }: SignInFormProps) => {
    //Alert Dialog
    const [showAlert, setShowAlert] = React.useState(false)
    const [showErrorAlert, setShowErrorAlert] = React.useState(false)

    const setLoggedInUserValue = useSetRecoilState<IUser | null>(loggedInUser)

    //Type of form input data validation 
    const formValidationSchema = z.object({
        email: z.string().email({ message: 'Email inválido' }),
        password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }).max(50, { message: 'Senha deve ter no máximo 50 caracteres' })
    })

    //Type of form result data
    type FormInputs = z.infer<typeof formValidationSchema>

    //'Create' form
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>(
        {
            //Validation resolver
            resolver: zodResolver(formValidationSchema)
        }
    )
    //Form submit handler
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        const user = await signIn(data.email, data.password)

        if (user) {
            setShowAlert(true)

            localStorage.setItem('token', user.token || '')
            localStorage.setItem('user_name', user.name || '')
            localStorage.setItem('user_id', user.id || '')
            setLoggedInUserValue(user)

            if (loginFunction) {
                loginFunction(user)
            }
        } else {
            console.log('error')
            setLoggedInUserValue(null)
            setShowErrorAlert(true)
        }

        reset()
    }

    function confirmAction() {
        if (buttonAction) {
            buttonAction()
        }
    }

    return (
        <form method="post" name="subscriptions" onSubmit={handleSubmit(onSubmit)} data-netlify="true" data-netlify-honeypot="bot-field" className='flex flex-col gap-2'>
            <input type="hidden" name="form-name" value="subscriptions" />

            <Input {...register("email", { required: true })} placeholder="Email" type='email' />
            <ErrorMessage message={errors.email?.message} />

            <Input {...register("password", { required: true })} placeholder="Senha" type='password' />
            <ErrorMessage message={errors.password?.message} />

            <Button variant="default" type="submit">Entrar</Button>

            <SimpleAlertDialogue message="Login feito com sucesso!" open={showAlert} setOpen={setShowAlert} confirmAction={confirmAction} />
            <SimpleErrorAlertDialog message="Erro ao fazer login!" open={showErrorAlert} setOpen={setShowErrorAlert} />
        </form>
    )
}

export default SignInForm