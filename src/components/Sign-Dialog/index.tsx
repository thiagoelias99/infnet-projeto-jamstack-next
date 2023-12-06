'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import { useState } from 'react'
import SignInForm from './Sign-In-Form'
import SignUpForm from './Sign-Up-Form'

interface SignDialogProps {
    loginFunction?: (user: string) => void
}

const SignDialog = ({ loginFunction }: SignDialogProps) => {

    const [showSignUp, setShowSignUp] = useState(false)
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full md:w-1/3" >
                <p
                    className="w-full md:w-auto text-white text-base md:text-xl text-end underline cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    Entre
                </p>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Entre para interagir</DialogTitle>
                </DialogHeader>
                {showSignUp ? <SignUpForm buttonAction={() => setOpen(false)} loginFunction={loginFunction} /> : <SignInForm buttonAction={() => setOpen(false)} loginFunction={loginFunction} />}
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
