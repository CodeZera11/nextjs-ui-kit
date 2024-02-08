'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { Client } from '@/constants/types'
import { FileEdit } from 'lucide-react'
import { Button } from '../ui/button'
import { DataTableColumnHeader } from './data-table/data-table-column-header'
import { useGetClients } from '@/data/hooks/useClientsClient'
import Link from 'next/link'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'
import { Badge } from '../ui/badge'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import UpdateMortgageStatusForm from '../forms/dashboard/mortgage/update-status-form'
import AddClientCaseForm from '../forms/client/add-case-form'

export default function ClientsTable() {

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" />
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Last Name" />
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />
    },
    {
      accessorKey: 'phoneNumber',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Phone Number" />
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
      cell: ({ row }) => {
        return <Badge>{row.original.role}</Badge>
      }
    },
    {
      accessorKey: 'dateOfBirth',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date of Birth" />,
      cell: ({ row }) => {
        const dob = row.original.dateOfBirth
        return new Date(dob).toLocaleDateString()
      }
    },
    {
      accessorKey: 'supervisionTier',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Supervision Tier" />
    },
    {
      accessorKey: 'supervisionLevel',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Supervision Level" />
    },
    {
      accessorKey: 'attorneyName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Attorney Name" />
    },
    {
      accessorKey: 'attorneyEmail',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Attorney Email" />
    },
    {
      accessorKey: 'attorneyPhone',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Attorney Phone" />
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
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center">
          <ConfirmActionDialog
            title="Add Case"
            anchor={
              <Button variant="secondary" size="sm">
                Add Case
              </Button>
            }
            content={<AddClientCaseForm data={row.original} />}
          />

          <ConfirmDeleteDialog onDelete={() => { }} isLoading={false} />
        </div>
      )
    }
  ]

  const { loading, data } = useGetClients()

  return <DataTable columns={columns} data={data ?? []} isLoading={loading} filterKey="name" />
}
