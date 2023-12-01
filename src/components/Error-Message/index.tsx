interface ErrorMessageProps {
    message?: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <span className='text-sm text-red-500 text-left'>{message}</span>
    )
}

export default ErrorMessage