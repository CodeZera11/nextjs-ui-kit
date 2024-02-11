"use client"

import * as z from 'zod'
import Loader from "@/components/Loader"
import { DataTable } from "@/components/tables/data-table"
import { DataTableColumnHeader } from "@/components/tables/data-table/data-table-column-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Appointment, User } from "@/constants/types"
import { useGetOneCase } from "@/data/hooks/useCasesClient"
import { ColumnDef } from "@tanstack/react-table"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateCommentMutation, useGetCommentsByCase } from '@/data/hooks/useCommentsClient'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Form } from '@/components/ui/form'
import TextAreaElement from '@/components/forms/elements/text-area-element'
import { Button } from '@/components/ui/button'
import { Check, Send } from 'lucide-react'
import { AppointmentStatusesEnum, UserRoleEnum } from '@/constants/enums'
import { Badge } from '@/components/ui/badge'
import { FacetOption } from '@/components/tables/data-table/data'
import { CheckCircledIcon, Cross2Icon, CrossCircledIcon, StopwatchIcon } from '@radix-ui/react-icons'
import { useEffect, useRef } from 'react'
import ConfirmActionDialog from '@/components/dialogs/confirm-action-dialog'
import AddCaseAppointmentForm from '@/components/forms/client/add-case-appointment'

interface Props {
    params: { caseId: number }
}

const formSchema = z.object({
    message: z.string({
        required_error: 'Please enter a message'
    })
})

const Page = ({ params: { caseId } }: Props) => {

    const { data, isFetching } = useGetOneCase(caseId);
    const { data: comments } = useGetCommentsByCase(Number(caseId));
    const commentsContainerRef = useRef<any>(null);
    const userData = localStorage.getItem(LocalStorageKeys.USER);

    const userDetails: User = userData && JSON.parse(userData);

    const onMessageSent = () => {
        form.setValue('message', '')
    }

    const { mutate: sendComment, isPending: isLoading } = useCreateCommentMutation(onMessageSent)

    useEffect(() => {
        if (commentsContainerRef.current) {
            const parentDiv = commentsContainerRef.current;
            const lastChildDiv = parentDiv.lastElementChild;

            if (lastChildDiv) {
                const scrollTopValue = lastChildDiv.offsetTop - parentDiv.offsetTop;
                parentDiv.scrollTop = scrollTopValue;
            }
        }
    }, [comments])


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        sendComment({
            caseId: Number(caseId),
            ...values
        })
    }

    const message = form.watch("message");

    const columns: ColumnDef<Appointment>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />
        },
        {
            accessorKey: 'date',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <span>{new Date(data?.date).toLocaleDateString()}</span>
                )
            }
        },
        {
            accessorKey: 'note',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Note" />
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const data = row.original
                return <Badge>{data?.status}</Badge>
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            }
        },
        {
            accessorKey: 'type',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
            cell: ({ row }) => {
                const data = row.original
                return <Badge>{data?.type}</Badge>
            }
        }
    ]

    const appointmentStatusFilterOptions: FacetOption[] = [
        {
            label: 'Upcoming',
            value: AppointmentStatusesEnum.UPCOMING,
            icon: StopwatchIcon
        },
        {
            label: 'Acknowledged',
            value: AppointmentStatusesEnum.ACKNOWLEDGED,
            icon: CheckCircledIcon
        },
        {
            label: 'Declined',
            value: AppointmentStatusesEnum.DECLINED,
            icon: Cross2Icon
        },
        {
            label: 'Appeared',
            value: AppointmentStatusesEnum.APPEARED,
            icon: Check
        },
        {
            label: 'Absent',
            value: AppointmentStatusesEnum.ABSENT,
            icon: Cross2Icon
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
        <div className="w-full py-5">
            <h1 className="text-4xl w-full text-center font-semibold">Case Details</h1>
            <div className="mx-auto flex flex-col md:flex-row max-w-[90rem] items-start gap-8 p-6 ">
                <div className='flex-1 flex flex-col gap-5'>
                    <div className="text-start border w-fit p-5 shadow-md rounded-xl">
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
                            <div className='space-y-4'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-xl font-semibold'>Appointments</h2>
                                </div>
                                <DataTable showDateFilter={false} columns={columns} data={data?.appointments ?? []} isLoading={isFetching} filterKey="type" showPagination={false} facetOptions={appointmentStatusFilterOptions} facetKey='status' />
                            </div>
                        </div>
                    </div>
                </div>
                <Card className="flex flex-col gap-2 shadow-md rounded-xl min-w-[30rem]">
                    <CardHeader className="text-xl rounded-t-xl font-bold uppercase text-start bg-light_black text-white">Chat with the {userDetails.role === UserRoleEnum.CLIENT ? "Case Manager" : "Client"}</CardHeader>
                    <div className='h-[22rem] overflow-y-scroll p-5' ref={commentsContainerRef}>
                        {comments &&
                            comments?.map((comment, i) => {
                                return (
                                    <div className="flex flex-col gap-4" key={i}>
                                        {(comment.role === UserRoleEnum.CLIENT) ? (
                                            <div className="flex items-end mt-2">
                                                <div className="h-10 w-10 flex-none">
                                                    <Avatar className="h-full w-full">
                                                        <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
                                                        <AvatarFallback>
                                                            {comment.user.firstName.charAt(0) + comment.user.lastName.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className="ml-2 flex-1">
                                                    <div className="rounded-lg bg-blue-100 p-3 text-black dark:bg-blue-900 dark:text-white">
                                                        {comment.message}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-end justify-end mt-2">
                                                <div className="mr-2 flex-1">
                                                    <div className="rounded-lg bg-gray-200 p-3 text-black dark:bg-gray-800 dark:text-white">
                                                        {comment.message}
                                                    </div>
                                                </div>
                                                <div className="h-10 w-10 flex-none">
                                                    <Avatar className="h-full w-full">
                                                        <AvatarImage alt="Admin" src="/placeholder-avatar.jpg" />
                                                        <AvatarFallback>{comment.user.firstName.charAt(0) + comment.user.lastName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
                            <div className="flex mt-2 w-full flex-col items-center gap-2">
                                <TextAreaElement name="message" placeholder="Type here..." className="h-[100px] w-[450px]" />
                                <Button disabled={isLoading || !message} type="submit" className="h-full w-full">
                                    {isLoading ? (
                                        'Sending...'
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Send <Send className="h-5 w-5" />
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default Page