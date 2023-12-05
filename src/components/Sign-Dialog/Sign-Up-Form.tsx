'use client'

import React from 'react'
import moment from 'moment'
import { useForm, SubmitHandler, set } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import ErrorMessage from '@/components/Error-Message'
import SimpleAlertDialogue from '@/components/Alert-Dialogs/Simple-Alert-Dialog'
import CheckboxWithLabel from '@/components/Forms/Fields/Checkbox-With-Label'

import { signIn, signUp } from '@/services/firebase'
import { sign } from 'crypto'
import SimpleErrorAlertDialog from '../Alert-Dialogs/Simple-Error-Alert-Dialog'

const SignUpForm = () => {
    //Alert Dialog
    const [showAlert, setShowAlert] = React.useState(false)
    const [showErrorAlert, setShowErrorAlert] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState('')

    //Type of form input data validation 
    const formValidationSchema = z.object({
        name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }).max(50, { message: 'Nome deve ter no máximo 50 caracteres' }),
        email: z.string().email({ message: 'Email inválido' }),
        password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }).max(50, { message: 'Senha deve ter no máximo 50 caracteres' }),
        repeatPassword: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }).max(50, { message: 'Senha deve ter no máximo 50 caracteres' })
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

        if (data.password !== data.repeatPassword) {
            setAlertMessage('Senhas não conferem')
            setShowErrorAlert(true)
            return
        }

        const response = await signUp(data.email, data.password, data.name)

        if (response.token) {
            setAlertMessage('Cadastro realizado com sucesso')
            console.log(response.token)

            localStorage.setItem('token', response.token)
            setShowAlert(true)
        } else {
            setAlertMessage('Erro ao cadastrar')
            setShowErrorAlert(true)
        }   

        reset()
    }

    return (
        <form method="post" name="subscriptions" onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>

            <Input {...register("name", { required: true })} placeholder="Nome" type='text' />
            <ErrorMessage message={errors.name?.message} />

            <Input {...register("email", { required: true })} placeholder="Email" type='email' />
            <ErrorMessage message={errors.email?.message} />

            <Input {...register("password", { required: true })} placeholder="Senha" type='password' />
            <ErrorMessage message={errors.password?.message} />

            <Input {...register("repeatPassword", { required: true })} placeholder="Repetir senha" type='password' />
            <ErrorMessage message={errors.repeatPassword?.message} />

            <Button variant="default" type="submit">Cadastrar</Button>

            <SimpleAlertDialogue message={alertMessage} open={showAlert} setOpen={setShowAlert} />
            <SimpleErrorAlertDialog message={alertMessage} open={showErrorAlert} setOpen={setShowErrorAlert} />
        </form>
    )
}

export default SignUpForm