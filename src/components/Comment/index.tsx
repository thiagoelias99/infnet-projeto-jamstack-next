import { IComments } from '@/models/Comments'

interface CommentProps {
  comment: IComments
}

const PostComment = ({ comment }: CommentProps) => {
  return (
    <div className="flex flex-col items-start border w-full p-2 mb-2 rounded">
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