
import type { Metadata } from 'next'
import './globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContextRoot from '@/recoil/ContextRoot'


export const metadata: Metadata = {
  title: 'Trazler',
  description: 'Trazler is a travel blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-BR">
      <ContextRoot>
        <body className='w-screen min-h-screen m-auto flex flex-col justify-between overflow-x-hidden'>
          <Header />
          {children}
          <Footer />
        </body>
      </ContextRoot>
    </html>
  )
}
