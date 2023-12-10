import { XOctagon } from 'lucide-react'
import { IComments } from '@/models/Comments'

interface CommentProps {
  comment: IComments
  showDelete?: boolean
}

const PostComment = ({ comment, showDelete = false }: CommentProps) => {
  return (
    <div className="flex flex-col items-start border w-full p-2 mb-2 rounded relative">
      {showDelete && (
        <div className='absolute -right-2 -top-1' role='button'>
          <XOctagon className="h-5 w-5 stroke-red-500 bg-transparent" />
        </div>
      )}
      <div className='flex justify-between items-center w-full'>
        <p className='font-bold text-sm'>{comment.userName}</p>
        <p className='italic text-sm'>em {new Date(comment.createdAt).toLocaleString()}</p>
      </div>
      <div className='mt-4'>
        <p>{comment.content}</p>
      </div>
    </div>
  )
}

export default PostComment