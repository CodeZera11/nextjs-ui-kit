import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client, TOption } from '@/constants/types'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useGetCaseManagers } from '@/data/hooks/useClientsClient'
import { useEffect, useState } from 'react'
import SelectElement from '../elements/select-element'
import { useAssignCaseManagerMutation } from '@/data/hooks/useCasesClient'

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

type TCaseManager = z.infer<typeof formSchema>

const AssignCaseManagerForm = ({ data }: Props) => {

    const { data: caseManagersData } = useGetCaseManagers();

    const [caseManagersOptions, setCaseManagersOptions] = useState<TOption[]>();
    const [caseOptions, setCaseOptions] = useState<TOption[]>();
    const [singleCase, setSingleCase] = useState(true);

    const { mutate: assignCaseManager, isPending: isLoading } = useAssignCaseManagerMutation()

    useEffect(() => {
        if (data?.clientCases && data?.clientCases?.length > 0) {
            const caseOptions = data?.clientCases?.map((clientCase) => {
                return {
                    label: `${clientCase.docketNumber} - ${clientCase.type}`,
                    value: clientCase.id.toString()
                }
            })
            setCaseOptions(caseOptions)
        }
        if (caseManagersData && caseManagersData?.length > 0) {
            let options: TOption[] = []
            caseManagersData?.map((caseManager: any) => {
                options.push({
                    label: `${caseManager.firstName} ${caseManager.lastName}`,
                    value: caseManager.id.toString()
                })
            })

            setCaseManagersOptions(options)
        }
    }, [caseManagersData, data?.clientCases])

    const form = useForm<TCaseManager>({
        resolver: zodResolver(formSchema),
    })

    useEffect(() => {
        if (data?.clientCases?.length === 1) {
            setSingleCase(true);
            form.setValue("caseId", data?.clientCases[0].id.toString());
        } else {
            setSingleCase(false);
        }
    }, [data, form])

    function onSubmit(values: TCaseManager) {
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
                {!singleCase && (
                    <SelectElement name="caseId" placeholder="Please select a case" label="Case" options={caseOptions || []} />
                )}
                <SelectElement disabled={!currentCase} name="caseManagerId" placeholder="Please select a case manager" label="Case Manager" options={caseManagersOptions || []} />
                <Button disabled={isLoading} type="submit" className='w-full'>
                    {isLoading ? 'Saving...' : 'Save changes'}
                </Button>
            </form>
        </Form>
    )
}

export default AssignCaseManagerForm
