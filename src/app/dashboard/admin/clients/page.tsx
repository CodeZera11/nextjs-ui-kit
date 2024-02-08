'use client'

import ClientsTable from '@/components/tables/clients-table'
import { Button } from '@/components/ui/button'
import { PageRoutes } from '@/constants/page-routes'
import Link from 'next/link'

const Page = () => {
  return (
    <>
      <header className="dashboard_header justify-between dark:bg-gray-800/40 lg:h-[60px]">
        <h1 className="text-lg font-semibold">Clients</h1>
        <Link href={PageRoutes.dashboard.admin.CLIENTS}>
          <Button>Create New Client</Button>
        </Link>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="rounded-lg border p-2 shadow-sm">
          <ClientsTable />
        </div>
      </main>
    </>
  )
}

export default Page
