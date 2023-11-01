import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Store from './api'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rick and Morty Characters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Store>
          {children}
        </Store>
      </body>
    </html>
  )
}
