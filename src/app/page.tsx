'use client'

import { Button } from '@/components/ui/button'
import { PageRoutes } from '@/constants/page-routes'
import Link from 'next/link'

export default function Home() {

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
          <div className="flex items-center justify-center gap-10">
            <Link href={PageRoutes.dashboard.admin.CLIENTS}>
              <Button className="p-8 text-lg" size="lg">
                View Clients
              </Button>
            </Link>
            <Link href={PageRoutes.dashboard.CASES}>
              <Button className="p-8 text-lg" size="lg">
                View Cases
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
