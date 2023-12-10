'use client'
import { v4 as uuidv4 } from "uuid"
// import { useRouter } from 'next/router'

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { addCommentForPost, validateUserByToken } from '@/services/firebase'
import SimpleAlertDialogue from '../Alert-Dialogs/Simple-Alert-Dialog'
import { IComments } from '@/models/Comments'

interface CommentInputProps {
    slug: string
}

const CommentInput = ({ slug }: CommentInputProps) => {
    console.log('slug', slug)

    const [comment, setComment] = useState("")
    const [user, setUser] = useState<string | null>(null)
    const [showAlert, setShowAlert] = useState(false)
    const [userId, setUserId] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userName = localStorage.getItem('user_name')

        setUser(userName)

        if (token) {
            validateUserByToken(token)
                .then((user) => {
                    setUserId(user || '')
                    setUser(userName)
                })
                .catch((error) => {
                    setUser(null)
                })
        } else {
            setUser(null)
        }
    }, [])


    function handleButtonClick() {
        if (comment === "") return

        const commentData: IComments = {
            id: uuidv4(),
            content: comment,
            userName: user || '',
            userId,
            createdAt: new Date().toISOString()
        }
        addCommentForPost(slug, commentData)

        setShowAlert(true)
        setComment("")
    }

    function refreshPage() {
        // router.reload()
        window.location.reload()
    }

    return (
        <div className="grid w-full gap-1.5 mt-8">
            {!user &&
                <h4 className='w-fall text-center font-bold'>Faça login para comentar</h4>
            }
            {user &&
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