'use client'

import type { Metadata } from 'next'
import './globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { signIn, signUp, validateUserByToken } from '@/services/firebase'

// export const metadata: Metadata = {
//   title: 'Trazler',
//   description: 'Trazler is a travel blog',
// }

async function handleClick() {
  signUp('thiago@email.com', '123456', 'Thiago Elias')
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error)
    })
}

async function handleClick2() {
  signIn('thiago@email.com', '123456')
    .then((response) => {
      console.log(response)
    })
  // console.log(result)
}

async function handleClick3() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmMFJocklBSlJtYzU5djJQM3h4bkNFdENaaWIyIiwiaWF0IjoxNzAxNTI3Mjg4LCJleHAiOjE3MDE1MzA4ODh9.UNqZLFbW4ipy7Vd_chr8Rxtryssxc_oAT4l8pZKHzF4'

  validateUserByToken(token)
    .then((response) => {
      console.log(response)
    })
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className='w-screen min-h-screen m-auto flex flex-col justify-between overflow-x-hidden'>
        <Header />
        {children}
        <Footer />
        <button onClick={e => handleClick()}>Sign Up</button>
        <button onClick={e => handleClick2()}>Sign In</button>
        <button onClick={e => handleClick3()}>Check</button>
      </body>
    </html>
  )
}
