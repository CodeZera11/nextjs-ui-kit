'use client'

import { Button } from '@/components/ui/button'
import { PageRoutes } from '@/constants/page-routes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {

  const router = useRouter()
  useEffect(() => {
    router.push(PageRoutes.SIGNIN)
  }, [])

  return null

  return (
    <section className="overflow-x-hidden">
      <div className="relative h-auto min-h-screen">
        <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-10">
            <Link href={PageRoutes.SIGNIN}>
              <Button className="p-8 text-lg" size="lg">
                Login
              </Button>
            </Link>
            <Link href={PageRoutes.SIGNUP}>
              <Button className="p-8 text-lg" size="lg">
                Signup
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
