'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { Case } from '@/constants/types'
import { DataTableColumnHeader } from './data-table/data-table-column-header'
import { useGetCases } from '@/data/hooks/useCasesClient'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { useRouter } from 'next/navigation'

interface Props {
  data: Case[] | undefined
  loading: boolean
}

export default function CasesTable({ data, loading }: Props) {

  const columns: ColumnDef<Case>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />
    },
    {
      accessorKey: 'type',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />
    },
    {
      accessorKey: 'charge',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Charge" />
    },
    {
      accessorKey: 'chargeDescription',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Charge Description" />
    },
    {
      accessorKey: 'docketNumber',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Docket Number" />
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => {
        const createdAt = row.original.createdAt
        return new Date(createdAt).toLocaleDateString()
      }
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At" />,
      cell: ({ row }) => {
        const createdAt = row.original.createdAt
        return new Date(createdAt).toLocaleDateString()
      }
    },
    {
      id: 'appointments',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className="flex items-center gap-2">
            {data?.appointments && data?.appointments?.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View Appointments</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Appointments</DialogTitle>
                  </DialogHeader>
                  <div className="grid max-h-[600px] grid-cols-2 gap-5 overflow-y-auto py-4">
                    {data.appointments.map((appointment, i) => {
                      return (
                        <Card key={i}>
                          <CardHeader>
                            <CardTitle className='flex w-full items-center justify-between'>
                              <div>{appointment.status}</div>
                              <div>{appointment?.date && new Date(appointment?.date).toLocaleDateString()}</div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {appointment.note}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        )
      }
    },
    {
      id: 'viewCase',
      cell: ({ row }) => {
        return (
          <Link href={`${PageRoutes.dashboard.CASES}/${row.original.id}`}>
            <Button variant="secondary" size="sm">View Case</Button>
          </Link>
        )
      }
    }
  ]



  return <DataTable columns={columns} data={data ?? []} isLoading={loading} filterKey="firstName" />
}
