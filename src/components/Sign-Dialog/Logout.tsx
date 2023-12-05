import { useState } from 'react'
import ConfirmationAlertDialog from '../Alert-Dialogs/Confirmation-Alert-Dialog'

interface LogoutProps {
    userName: string
    logoutFunction: () => void
}

const Logout = ({ userName, logoutFunction }: LogoutProps) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <p className="w-full md:w-auto text-white text-base md:text-xl text-end underline"
                onClick={() => setOpen(true)}
            >
                Olá {userName}
            </p>
            <ConfirmationAlertDialog
                open={open}
                setOpen={setOpen}
                message={'Deseja realizar o logoff?'}
                confirmAction={logoutFunction}
            />
        </>
    )
}

export default Logout