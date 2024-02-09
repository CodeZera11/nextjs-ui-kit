"use client"

import Loader from "@/components/Loader"
import { DataTable } from "@/components/tables/data-table"
import { DataTableColumnHeader } from "@/components/tables/data-table/data-table-column-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Appointment } from "@/constants/types"
import { useGetOneCase } from "@/data/hooks/useCasesClient"
import { ColumnDef } from "@tanstack/react-table"
import { MessageCircleIcon, X } from "lucide-react"

interface Props {
    params: { caseId: number }
}

const Page = ({ params: { caseId } }: Props) => {

    const { data, isFetching } = useGetOneCase(caseId)

    const columns: ColumnDef<Appointment>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />
        },
        {
            accessorKey: 'date',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />
        },
        {
            accessorKey: 'note',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Note" />
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />
        },
    ]

    if (isFetching) {
        return (
            <div className="flex h-[100vh] items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <div className="w-full py-10">
            <h1 className="text-4xl w-full text-center">Case Details</h1>
            <div className="mx-auto flex flex-col max-w-[90rem] items-start gap-8 p-6">
                <div className="text-start border p-5 shadow-md rounded-xl">
                    Docket Number - {data?.docketNumber}
                </div>
                <div className="w-full flex items-start justify-between gap-5">
                    <div className="flex flex-col gap-10 flex-1">
                        <Card>
                            <CardHeader className="text-2xl font-semibold">Charge Details</CardHeader>
                            <CardContent>
                                <p className="flex items-center justify-between">Charge: {data?.charge}</p>
                                <p className="flex items-center justify-between">Charge Description: {data?.chargeDescription}</p>
                            </CardContent>
                        </Card>
                        <DataTable columns={columns} data={data?.appointments ?? []} isLoading={isFetching} filterKey="firstName" showFilters={false} showPagination={false} />
                    </div>
                    <div className="flex flex-col gap-2 shadow-md rounded-xl p-5 min-w-[30rem]">
                        <h2 className="text-xl font-semibold uppercase">Chat with the case manager</h2>
                        <div className="min-h-[25rem] overflow-y-scroll">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page