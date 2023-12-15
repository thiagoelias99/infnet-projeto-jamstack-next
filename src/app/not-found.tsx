import NextLink from 'next/link'

const NotFoundPage = () => {
    return (
        <div className='flex flex-col items-center justify-center mt-32 h-full flex-1'>
          <h1 className='text-4xl md:text-6xl text-center'>404</h1>
          <p className='text-2xl md:text-4xl text-center'>Página não encontrada</p>
          <NextLink href='/' className='text-2xl md:text-4xl text-center mt-4'>Voltar para a página inicial</NextLink>
        </div>
    )
  }
  
  export default NotFoundPage