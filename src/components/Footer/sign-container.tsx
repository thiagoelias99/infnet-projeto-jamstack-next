import React from 'react'

interface SignProps {
  title: string
  author: string
}

const Sign = ({ title, author }: SignProps) => {
  return (
    <div className='w-full'>
      <p className='text-white text-l font-thin'>{title} <span className='font-bold uppercase'>{author}</span></p>
    </div>
  )
}

export default function SignContainer() {
  return (
    <div className='flex flex-col w-full md:w-1/3 justify-center items-start md:order-1 order-3'>
      <Sign title='Desenvolvido por' author='Thiago Elias' />
    </div>
  )
}
