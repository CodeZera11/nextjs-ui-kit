import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client } from '@/constants/types'
import { Form } from '@/components/ui/form'
import SelectElement from '@/components/forms/elements/select-element'
import { Button } from '@/components/ui/button'
import { useUpdateMortgageMutation } from '@/data/hooks/useMortgageClient'
import { MortgageStatusEnum } from '@/constants/enums'
import { mortgageSubmissionStatuses } from '@/constants/mortgage'
import DatePickerElement from '../elements/date-picker-element'
import { useAddCaseMutation } from '@/data/hooks/useClientsClient'

interface Props {
    data: Client
}

const formSchema = z.object({
    nextCourtDate: z.date()
})

type TMortgageStatus = z.infer<typeof formSchema>
const AddClientCaseForm = ({ data }: Props) => {
    const { mutate: addCase, isPending: isLoading } = useAddCaseMutation()

    const form = useForm<TMortgageStatus>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: TMortgageStatus) {
        addCase({
            id: data?.id,
            ...values
        })
        console.log({ values })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
                <DatePickerElement
                    custom
                    name="nextCourtDate"
                    label="Next Court Date"
                />
                <Button disabled={isLoading} type="submit" className='w-full'>
                    {isLoading ? 'Saving...' : 'Save changes'}
                </Button>
            </form>
        </Form>
    )
}

export default AddClientCaseForm
