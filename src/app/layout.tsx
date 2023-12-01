import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
