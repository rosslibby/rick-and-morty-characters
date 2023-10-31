import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from 'components/navigation'
import Store from './api'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
