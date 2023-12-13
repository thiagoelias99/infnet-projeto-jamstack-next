'use client'
import { v4 as uuidv4 } from "uuid"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button'
import { useState } from 'react'
import { addCommentForPost } from '@/services/firebase'
import SimpleAlertDialogue from '../Alert-Dialogs/Simple-Alert-Dialog'
import { IComments } from '@/models/Comments'
import { useRecoilValue, useSetRecoilState } from "recoil"
import { loggedInUser, updateCommets } from "@/recoil/atom"

interface CommentInputProps {
    slug: string
}

const CommentInput = ({ slug }: CommentInputProps) => {

    const loggedInUserValue = useRecoilValue(loggedInUser)
    const updateComments = useRecoilValue(updateCommets)
    const setUpdateComments = useSetRecoilState(updateCommets)

    const [comment, setComment] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    function handleButtonClick() {
        if (comment === "") return

        const commentData: IComments = {
            id: uuidv4(),
            content: comment,
            userName: loggedInUserValue?.name || '',
            userId: loggedInUserValue?.id || '',
            createdAt: new Date().toISOString()
        }
        addCommentForPost(slug, commentData)

        setShowAlert(true)
        setComment("")
    }

    function refreshPage() {
        setUpdateComments(!updateComments)
    }

    return (
        <div className="grid w-full gap-1.5 mt-8">
            {!loggedInUserValue &&
                <h4 className='w-fall text-center font-bold'>Faça login para comentar</h4>
            }
            {loggedInUserValue &&
                <>
                    <Label htmlFor="message">Inserir um comentário</Label>
                    <Textarea placeholder="Digite seu comentário aqui..." id="message" value={comment} onChange={e => setComment(e.target.value)} />
                    <Button onClick={handleButtonClick}>Postar</Button>
                </>
            }
            <SimpleAlertDialogue message='Comentário enviado com sucesso!' open={showAlert} setOpen={setShowAlert} confirmAction={refreshPage} />
        </div>
    )
}

export default CommentInput