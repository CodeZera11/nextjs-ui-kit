'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { Client, User } from '@/constants/types'
import { Button } from '../ui/button'
import { DataTableColumnHeader } from './data-table/data-table-column-header'
import { useDeleteClientMutation, useGetClients } from '@/data/hooks/useClientsClient'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'
import { Badge } from '../ui/badge'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import AddClientCaseForm from '../forms/client/add-case-form'
import AssignCaseManagerForm from '../forms/client/assign-case-manager-form'
import AddCaseAppointmentForm from '../forms/client/add-case-appointment'
import TableDetailsDialog from '../dialogs/table-details-dialog'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { UserRoleEnum } from '@/constants/enums'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { Edit } from 'lucide-react'
import EditClientForm from '../forms/client/edit-client-form'

export default function ClientsTable() {

  const { mutate: deleteClient, isPending: isLoading } = useDeleteClientMutation()
  const userData = localStorage.getItem(LocalStorageKeys.USER);
  const userDetails: User = userData && JSON.parse(userData)

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
      accessorKey: 'dateOfBirth',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date of Birth" />,
      cell: ({ row }) => {
        const dob = row.original.dateOfBirth
        return new Date(dob).toLocaleDateString()
      }
    },
    // {
    //   accessorKey: 'supervisionTier',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Supervision Tier" />
    // },
    // {
    //   accessorKey: 'supervisionLevel',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Supervision Level" />
    // },
    // {
    //   accessorKey: 'attorneyName',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Attorney Name" />
    // },
    // {
    //   accessorKey: 'attorneyEmail',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Attorney Email" />
    // },
    // {
    //   accessorKey: 'attorneyPhone',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Attorney Phone" />
    // },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => {
        const createdAt = row.original.createdAt
        return new Date(createdAt).toLocaleDateString()
      }
    },
    // {
    //   accessorKey: 'updatedAt',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At" />,
    //   cell: ({ row }) => {
    //     const createdAt = row.original.createdAt
    //     return new Date(createdAt).toLocaleDateString()
    //   }
    // },
    {
      id: 'clientCases',
      header: 'Cases',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            {data?.clientCases?.length === 1 && (
              <Link href={`${PageRoutes.dashboard.CASES}/${data?.clientCases[0].id}`}>
                <Button variant="secondary" size="sm">View Case Details</Button>
              </Link>
              // <TableDetailsDialog data={data} loading={isLoading} />
            )}
          </>
        )
      }
    },
    {
      id: 'assignCaseManager',
      cell: ({ row }) => {
        const data = row?.original;
        return (
          <>
            {(userDetails.role === UserRoleEnum.SUPER_ADMIN && data?.clientCases?.length > 0) && (
              <ConfirmActionDialog
                title="Assign Case Manager"
                anchor={
                  <Button size="sm" variant="secondary">
                    Assign Case Manager
                  </Button>
                }
                content={<AssignCaseManagerForm data={data} />}
              />
            )}
          </>
        )
      }
    },
    {
      id: 'addAppointment',
      cell: ({ row }) => {
        const data = row?.original;
        return (
          <>
            {data?.clientCases?.length > 0 && (
              <ConfirmActionDialog
                title="Add Appointment"
                anchor={
                  <Button size="sm" variant="secondary">
                    Add Appointment
                  </Button>
                }
                className='sm:max-w-[600px]'
                content={<AddCaseAppointmentForm clientCases={data?.clientCases} clientId={data?.id} />}
              />
            )}
          </>
        )
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <>
          <div className="flex items-center gap-2">
            {/* <ConfirmActionDialog
            title="Add Case"
            anchor={
              <Button variant="secondary" size="sm">
                Add Case
              </Button>
            }
            content={<AddClientCaseForm data={row.original} />}
          /> */}
            {(userDetails.role === UserRoleEnum.SUPER_ADMIN || userDetails.role === UserRoleEnum.CASE_MANAGER) && (
              <ConfirmActionDialog
                className='sm:max-w-[90rem]'
                title="Edit Client"
                anchor={
                  <Button size="sm" variant="outline">
                    <Edit size={15} />
                  </Button>
                }
                content={<EditClientForm data={row.original} />}
              />
            )}
            <ConfirmDeleteDialog onDelete={() => { deleteClient(row.original.id) }} isLoading={isLoading} />
          </div>
        </>
      )
    }
  ]

  const { loading, data } = useGetClients()

  return <DataTable columns={columns} data={data ?? []} isLoading={loading} filterKey="firstName" />
}
