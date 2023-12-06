'use client'

import React from 'react'
import moment from 'moment'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import ErrorMessage from '@/components/Error-Message'
import SimpleAlertDialogue from '@/components/Alert-Dialogs/Simple-Alert-Dialog'
import CheckboxWithLabel from '@/components/Forms/Fields/Checkbox-With-Label'
import { subscribeEmail } from '@/services/firebase'

const SubscriptionForm = () => {
  //Alert Dialog
  const [showAlert, setShowAlert] = React.useState(false)

  //Type of form input data validation 
  const formValidationSchema = z.object({
    "form-name": z.string().default('subscriptions'),
    firstName: z.string().min(2, { message: 'Nome muito curto' }),
    lastName: z.string().min(2, { message: 'Sobrenome muito curto' }),
    email: z.string().email({ message: 'Email inválido' }),
    date: z.string().default(moment().toISOString()),
    newPost: z.boolean().default(true),
    weeklyResume: z.boolean().default(true),
    monthlyResume: z.boolean().default(true)
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
  const onSubmit: SubmitHandler<FormInputs> = (data) => {

    subscribeEmail(data.firstName, data.email)
    setShowAlert(true)
    reset()
  }

  return (
    <form method="post" name="subscriptions" onSubmit={handleSubmit(onSubmit)} data-netlify="true" data-netlify-honeypot="bot-field" className='flex flex-col gap-2'>
      <input type="hidden" name="form-name" value="subscriptions" />

      <Input {...register("firstName", { required: true })} placeholder="Nome" />
      <ErrorMessage message={errors.firstName?.message} />

      <Input {...register("lastName", { required: true })} placeholder="Sobrenome" />
      <ErrorMessage message={errors.lastName?.message} />

      <Input {...register("email", { required: true })} placeholder="Email" />
      <ErrorMessage message={errors.email?.message} />

      <h3 className='pt-4'>O que você deseja receber?</h3>

      <CheckboxWithLabel label='Novos posts' register={register} name='newPost' />
      <ErrorMessage message={errors.newPost?.message} />
      <CheckboxWithLabel label='Resumo semanal' register={register} name='weeklyResume' />
      <ErrorMessage message={errors.weeklyResume?.message} />
      <CheckboxWithLabel label='Resumo mensal' register={register} name='monthlyResume' />
      <ErrorMessage message={errors.monthlyResume?.message} />

      <Button variant="default" type="submit">Inscrever-se</Button>

      <SimpleAlertDialogue message="Você foi inscrito com sucesso!" open={showAlert} setOpen={setShowAlert} />
    </form>
  )
}

export default SubscriptionForm