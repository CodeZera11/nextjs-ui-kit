import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className='relative'>
                    <Button
                        className='absolute top-5 left-5'
                        size="icon"
                        asChild
                    >
                        <Link href={PageRoutes.HOME}>
                            <ArrowLeft size={24} color='white' />
                        </Link>
                    </Button>
                    {children}
                </main>
            </body>
            <Toaster />
        </html>
    )
}
