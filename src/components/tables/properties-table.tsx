'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { useDeletePropertyMutation, useGetProperties } from '@/data/hooks/usePropertiesClient'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { Eye, FileEdit } from 'lucide-react'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import { Button } from '../ui/button'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'
import UpdatePropertyForm from '@/app/dashboard/properties/_forms/update-property-form'
import { Property } from '@/data/clients/propertiesClient'
import currency from '@/lib/currency'
import AssignAgentForm from '@/app/dashboard/properties/_forms/assign-agent-form'
import { useGetAgents } from '@/data/hooks/useAgentsClient'
import { PropertySubmissionStatusEnum, UserRoleEnum } from '@/constants/enums'
import { User } from '@/constants/types'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { useGetUserRole } from '@/data/hooks/useAuthClient'

export default function PropertiesTable() {
  const { loading: isLoading, data: agentsData } = useGetAgents()

  const { mutate: deleteProperty, isPending } = useDeletePropertyMutation()

  const storedValue = localStorage.getItem(LocalStorageKeys.USER)

  const { data: role } = useGetUserRole();

  const columns: ColumnDef<Property>[] = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      id: 'name',
      header: 'Name',
      cell: ({ row }) => {
        return <span className="line-clamp-1 max-w-sm">{row.original.name}</span>
      }
    },
    {
      accessorKey: 'phone',
      header: 'Phone'
    },
    {
      id: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const monthlyIncome = row.original.amount
        return <span>{currency.format(monthlyIncome)}</span>
      }
    },
    {
      accessorKey: 'landmark',
      header: 'Landmark'
    },
    {
      id: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const createdAt = row.original.createdAt
        return new Date(createdAt).toLocaleDateString()
      }
    },
    {
      id: 'updatedAt',
      header: 'Updated At',
      cell: ({ row }) => {
        const updatedAt = row.original.createdAt
        return new Date(updatedAt).toLocaleDateString()
      }
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const data = row.original
        return <Badge>{data.submissionStatus}</Badge>
      }
    },
    {
      id: 'agent',
      header: 'Agent',
      cell: ({ row }) => {
        const data = row.original
        if (data?.agentId) {
          return <Badge className="bg-teal-600">Assigned</Badge>
        }
        return <Badge variant="outline">Not Assigned</Badge>
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center">
          <Link href={PageRoutes.dashboard.PROPERTY_DETAILS(row.original.id)}>
            <Button variant="ghost">
              <Eye size={17} color="black" />
            </Button>
          </Link>
          {(role === UserRoleEnum.ADMIN || role === UserRoleEnum.SUPER_ADMIN) && (<ConfirmActionDialog
            title="Edit Property"
            anchor={
              <Button variant="ghost">
                <FileEdit size={17} color="black" />
              </Button>
            }
            content={<UpdatePropertyForm data={row.original} />}
          />)}
          {(role === UserRoleEnum.ADMIN || role === UserRoleEnum.SUPER_ADMIN) && (<ConfirmDeleteDialog onDelete={() => deleteProperty(row.original.id)} isLoading={isPending} />)}
        </div>
      )
    }
  ]

  if (role === UserRoleEnum.ADMIN || role === UserRoleEnum.SUPER_ADMIN) {
    columns.push({
      id: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <>
          {
            row.original.submissionStatus === PropertySubmissionStatusEnum.APPROVED && (
              <ConfirmActionDialog
                title="Assign Agent"
                anchor={<Button>Assign Agent</Button>}
                content={<AssignAgentForm agentsData={agentsData} data={row.original} />}
              />
            )
          }
        </>
      )
    },)
  }

  const { loading, data } = useGetProperties()
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
