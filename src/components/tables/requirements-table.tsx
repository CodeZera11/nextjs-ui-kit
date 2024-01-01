'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { RequirementApplication } from '@/constants/types'
import { useGetRequirements } from '@/data/hooks/useRequirementsClient'
import { Badge } from '../ui/badge'

import ActionButtons from './action-buttons'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { Eye } from 'lucide-react'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

export const columns: ColumnDef<RequirementApplication>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'incomeProfile',
    header: 'Income Profile'
  },
  {
    accessorKey: 'residenceType',
    header: 'Residence Type'
  },
  {
    id: 'requiredDocuments',
    header: 'Requirement Documents',
    cell: ({ row }) => {
      const document = row.original
      return (
        <div className='flex items-center gap-2'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View Documents</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Required Documents</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4 overflow-y-auto max-h-[500px]">
                {
                  document.requiredDocuments.map((document, i) => {
                    return (
                      <Card key={i} className="">
                        <CardHeader>
                          <CardTitle>{document.name}</CardTitle>
                        </CardHeader>
                      </Card>
                    )
                  })
                }
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Link href={PageRoutes.dashboard.PROPERTY_DETAILS(row.original.id)}>
          <Eye size={17} color="black" />
        </Link>
        {/* <ConfirmActionDialog
          title="Edit Property"
          anchor={
            <Button variant="ghost">
              <FileEdit size={17} color="black" />
            </Button>
          }
          content={<UpdatePropertyForm data={row.original} />}
        /> */}
        <ConfirmDeleteDialog onDelete={() => { }} isLoading />
      </div>
    )
  }
]

export default function RequirementsTable() {
  const { loading, data } = useGetRequirements()
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
