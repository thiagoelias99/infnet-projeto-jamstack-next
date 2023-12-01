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
import SubscriptionForm from "./Subscription-Form"

const SubscriptionDialog = () => {   
    return (
        <Dialog>
            <DialogTrigger asChild className="w-full md:w-1/3 order-1 md:order-2">
                <Button variant="outline" className="w-full md:w-auto">Inscreva-se</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Inscreva-se</DialogTitle>
                    <DialogDescription>Você será notificado sobre novas postagens</DialogDescription>
                </DialogHeader>
                <SubscriptionForm />
            </DialogContent>            
        </Dialog>
    )
}

export default SubscriptionDialog
