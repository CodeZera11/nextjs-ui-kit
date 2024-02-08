'use client'

import MapComponent from '@/components/MapPicker'
import { Button } from '@/components/ui/button'
import { otherLinks } from '@/constants/navigation'
import { PageRoutes } from '@/constants/page-routes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  // const router = useRouter()
  // useEffect(() => {
  // router.push(otherLinks.BASE_URL)
  // }, [])

  // return null

  // return <MapComponent onSelectLocation={() => console.log('test')} />

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
            <Link href={PageRoutes.mortgage.PERSONAL_DETAILS}>
              <Button className="p-8 text-lg" size="lg">
                View Clients
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
