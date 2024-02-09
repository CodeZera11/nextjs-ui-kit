'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { Client } from '@/constants/types'
import { Button } from '../ui/button'
import { DataTableColumnHeader } from './data-table/data-table-column-header'
import { useDeleteClientMutation, useGetClients } from '@/data/hooks/useClientsClient'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'
import { Badge } from '../ui/badge'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import AddClientCaseForm from '../forms/client/add-case-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Card, CardHeader, CardTitle } from '../ui/card'
import AssignCaseManagerForm from '../forms/client/assign-case-manager-form'
import AddCaseAppointmentForm from '../forms/client/add-case-appointment'

export default function ClientsTable() {

  const { mutate: deleteClient, isPending: isLoading } = useDeleteClientMutation()

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
      id: 'clientCases',
      header: 'Cases',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            {data?.clientCases?.length > 0 && (
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Case Details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                      <DialogTitle>Case Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid max-h-[500px] grid-cols-2 gap-4 overflow-y-auto py-4">
                      {data.clientCases.map((clientCase, i) => {
                        return (
                          <Card key={i}>
                            <CardHeader>
                              <CardTitle>{`${clientCase?.docketNumber} - ${clientCase?.type}`}</CardTitle>
                            </CardHeader>
                          </Card>
                        )
                      })}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
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
            {data?.clientCases?.length > 0 && (
              <ConfirmActionDialog
                title="Assign Case Manager"
                anchor={
                  <Button size="sm">
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
                content={<AddCaseAppointmentForm data={data} />}
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
        <div className="flex items-center gap-2">
          <ConfirmActionDialog
            title="Add Case"
            anchor={
              <Button variant="secondary" size="sm">
                Add Case
              </Button>
            }
            content={<AddClientCaseForm data={row.original} />}
          />

          <ConfirmDeleteDialog onDelete={() => { deleteClient(row.original.id) }} isLoading={isLoading} />
        </div>
      )
    }
  ]

  const { loading, data } = useGetClients()

  return <DataTable columns={columns} data={data ?? []} isLoading={loading} filterKey="name" />
}
