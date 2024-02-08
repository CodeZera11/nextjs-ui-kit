import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client, TOption } from '@/constants/types'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useAssignCaseManagerMutation, useGetCaseManagers } from '@/data/hooks/useClientsClient'
import { useEffect, useState } from 'react'
import SelectElement from '../elements/select-element'

interface Props {
    data: Client
}

const formSchema = z.object({
    caseId: z.string({
        required_error: "Please select a case!"
    }),
    caseManagerId: z.string({
        required_error: "Please select a case manager!"
    })
})

const AssignCaseManagerForm = ({ data }: Props) => {

    const [caseManagersOptions, setCaseManagersOptions] = useState<TOption[]>();
    const [caseOptions, setCaseOptions] = useState<TOption[]>();

    const { data: caseManagersData } = useGetCaseManagers()
    const { mutate: assignCaseManager, isPending: isLoading } = useAssignCaseManagerMutation()

    useEffect(() => {
        if (caseManagersData && caseManagersData?.length > 0) {
            let options: TOption[] = []
            caseManagersData?.map((caseManager: any) => {
                options.push({
                    label: `${caseManager.firstName} ${caseManager.lastName}`,
                    value: caseManager.id.toString()
                })
            })
            const caseOptions = data?.clientCases?.map((clientCase) => {
                return {
                    label: clientCase.nextCourtDate,
                    value: clientCase.id.toString()
                }
            })
            setCaseOptions(caseOptions)
            setCaseManagersOptions(options)
        }
    }, [caseManagersData, data?.clientCases])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        assignCaseManager({
            id: data?.id,
            caseId: Number(values.caseId),
            caseManagerId: Number(values.caseManagerId)
        })
    }

    const currentCase = form.watch("caseId");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
                <SelectElement name="caseId" placeholder="Please select a case" label="Case" options={caseOptions || []} />
                <SelectElement disabled={!currentCase} name="caseManagerId" placeholder="Please select a case manager" label="Case Manager" options={caseManagersOptions || []} />
                <Button disabled={isLoading} type="submit" className='w-full'>
                    {isLoading ? 'Saving...' : 'Save changes'}
                </Button>
            </form>
        </Form>
    )
}

export default AssignCaseManagerForm
