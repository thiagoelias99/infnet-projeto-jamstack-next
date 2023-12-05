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

interface ConfirmationAlertDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    message: string
    confirmText?: string,
    confirmAction?: () => void
    cancelText?: string,
    cancelAction?: () => void
}

const ConfirmationAlertDialog = ({ message, open, setOpen, confirmText = 'Confirmar', cancelAction, cancelText = 'Cancelar', confirmAction }: ConfirmationAlertDialogProps) => {

    function handleCancel() {
        setOpen(false)
        if (cancelAction) {
            cancelAction()
        }
    }

    function handleConfirm() {
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
                    <AlertDialogCancel onClick={handleCancel}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>{confirmText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default ConfirmationAlertDialog