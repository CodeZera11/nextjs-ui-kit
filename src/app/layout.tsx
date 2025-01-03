import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

import Providers from './providers'
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ui Kit | The Ultimate Next.js 15 Starter Kit',
  description: 'A powerful starter kit featuring Next.js 15, Framer Motion, NextAuth, Tailwind CSS, shadcn/ui, and React Query.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}><Providers>{children}</Providers></body>
      <Toaster />
    </html>
  )
}
