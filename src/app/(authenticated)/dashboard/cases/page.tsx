'use client'

import CasesTable from '@/components/tables/cases-table'
import { PageRoutes } from '@/constants/page-routes'
import { useGetCases } from '@/data/hooks/useCasesClient'
import { useRouter } from 'next/navigation'

const Page = () => {

  const { loading, data } = useGetCases();
  const router = useRouter();

  if (data?.length === 1) {
    router.push(`${PageRoutes.dashboard.CASES}/${data[0].id}`)
    return null
  }

  return (
    <>
      <header className="dashboard_header justify-between dark:bg-gray-800/40 lg:h-[60px]">
        <h1 className="text-lg font-semibold">Cases</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="rounded-lg border p-2 shadow-sm">
          <CasesTable data={data} loading={loading} />
        </div>
      </main>
    </>
  )
}

export default Page
