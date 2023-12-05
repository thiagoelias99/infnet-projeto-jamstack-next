import React from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface SimpleAlertDialogueProps {
    open: boolean
    setOpen: (open: boolean) => void
    message: string
}

const SimpleErrorAlertDialog = ({ message, open, setOpen }: SimpleAlertDialogueProps) => {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent className='border-red-600 border-2'>
                <AlertDialogHeader>
                    <AlertDialogTitle>{message}</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className='bg-red-600' onClick={e => setOpen(false)}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default SimpleErrorAlertDialog