'use client'

import CasesTable from '@/components/tables/cases-table'

const Page = () => {
  return (
    <>
      <header className="dashboard_header justify-between dark:bg-gray-800/40 lg:h-[60px]">
        <h1 className="text-lg font-semibold">Cases</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="rounded-lg border p-2 shadow-sm">
          {/* <CasesTable /> */}
          hi
        </div>
      </main>
    </>
  )
}

export default Page
