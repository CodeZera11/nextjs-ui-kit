import { Case, Client } from "@/constants/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle } from "../ui/card"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../tables/data-table/data-table-column-header"
import { DataTable } from "../tables/data-table"

interface Props {
    data: Client
    loading: boolean
}

const TableDetailsDialog = ({ data, loading }: Props) => {

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
            accessorKey: 'docketNumber',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Docket Number" />
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
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View Case Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-2xl">
                <DialogHeader>
                    <DialogTitle>Case Details</DialogTitle>
                </DialogHeader>
                <DataTable columns={columns} data={data?.clientCases ?? []} isLoading={loading} filterKey="firstName" />
            </DialogContent>
        </Dialog>
    )
}

export default TableDetailsDialog