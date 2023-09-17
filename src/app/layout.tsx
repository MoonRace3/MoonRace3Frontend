import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers/providers'
import { metadataMain } from '@/app/metadata'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = metadataMain

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
