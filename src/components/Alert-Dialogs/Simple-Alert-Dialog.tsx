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
    confirmAction?: () => void
}

const SimpleAlertDialogue = ({ message, open, setOpen, confirmAction }: SimpleAlertDialogueProps) => {
    function handleButton() {
        setOpen(false)

        if (confirmAction) {
            confirmAction()
        }
    }


    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{message}</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={handleButton}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default SimpleAlertDialogue