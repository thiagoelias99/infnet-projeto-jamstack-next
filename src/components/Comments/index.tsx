'use client'

import { IComments } from '@/models/Comments'
import { useEffect, useState } from 'react'
import PostComment from '../Comment'
import { getCommentsForPost } from '@/services/firebase'

interface CommentsProps {
    slug: string
}

const Comments = ({ slug }: CommentsProps) => {
    const [comments, setComments] = useState<IComments[]>([])

    useEffect(() => {
        getCommentsForPost(slug || '')
            .then(comments2 => {
                if (comments2) {
                    setComments(comments2)
                }
            })
    }, [])

    return (
        <div>
            {comments?.length === 0 || comments === null && (
                <div>
                    <p className='text-slate-600 text-lg'>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                </div>
            )}
            {comments?.map(comment => {
                return (
                    <PostComment key={comment.id} comment={comment} />
                )
            })}
        </div>
    )
}

export default Comments