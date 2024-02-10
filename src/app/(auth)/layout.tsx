import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Fortune',
    description: 'A law firm'
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main>
                    {children}
                </main>
            </body>
            <Toaster />
        </html>
    )
}
