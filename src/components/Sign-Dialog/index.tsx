'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import React from 'react'
import { Button } from "../ui/button"
import SignInForm from './Sign-In-Form'
import SignUpForm from './Sign-Up-Form'

const SignDialog = () => {

    const [showSignUp, setShowSignUp] = React.useState(false)

    return (
        <Dialog>
            <DialogTrigger asChild className="w-full md:w-1/3 order-1 md:order-2">
                <Button variant="outline" className="w-full md:w-auto">Entrar</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Entre para interagir</DialogTitle>
                </DialogHeader>
                {showSignUp ? <SignUpForm /> : <SignInForm />}
                {showSignUp ?
                    <p className='text-center'>Já possui conta? <span onClick={() => setShowSignUp(false)} className='cursor-pointer font-bold'>Entre</span></p>
                    :
                    <p className='text-center'>Não possui conta? <span onClick={() => setShowSignUp(true)} className='cursor-pointer font-bold'>Cadastre</span></p>
                }
            </DialogContent>
        </Dialog>
    )
}

export default SignDialog
