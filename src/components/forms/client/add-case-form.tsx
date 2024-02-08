import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client } from '@/constants/types'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useAddCaseMutation } from '@/data/hooks/useClientsClient'
import InputElement from '../elements/input-element'

interface Props {
    data: Client
}

const formSchema = z.object({
    // nextCourtDate: z.date()
    type: z.string({
        required_error: 'Please enter a type!'
    }).optional(),
    charge: z.string({
        required_error: 'Please enter your charge!'
    }).optional(),
    chargeDescription: z.string({
        required_error: 'Please enter your charge description!'
    }).optional(),
    docketNumber: z.string({
        required_error: 'Please enter your docket number!'
    }).optional(),
})

const AddClientCaseForm = ({ data }: Props) => {
    const { mutate: addCase, isPending: isLoading } = useAddCaseMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        addCase({
            id: data?.id,
            ...values
        })
        console.log({ values })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
                {/* <DatePickerElement
                    custom
                    name="nextCourtDate"
                    label="Next Court Date"
                /> */}
                <InputElement name="type" label="Type" />
                <InputElement name="charge" label="Charge" />
                <InputElement name="chargeDescription" label="Charge Description" />
                <InputElement name="docketNumber" label="Docket Number" />
                <Button disabled={isLoading} type="submit" className='w-full'>
                    {isLoading ? 'Saving...' : 'Save changes'}
                </Button>
            </form>
        </Form>
    )
}

export default AddClientCaseForm
