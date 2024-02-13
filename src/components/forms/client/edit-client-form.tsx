import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client } from '@/constants/types'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useUpdateClientMutation } from '@/data/hooks/useClientsClient'
import InputElement from '../elements/input-element'
import DatePickerElement from '../elements/date-picker-element'
import CustomInputElement from '../elements/custom-input-element'
import PhoneNumberInputElement from '../elements/phone-number-input'

interface Props {
    data: Client
}

const formSchema = z.object({
    firstName: z.string({
        required_error: 'Please enter your first name!'
    }),
    lastName: z.string({
        required_error: 'Please enter your last name!'
    }),
    dateOfBirth: z.date({
        required_error: 'Please enter your DOB'
    }),
    email: z.string({
        required_error: 'Please enter your email!'
    }),
    phoneNumber: z
        .string({
            required_error: 'Please enter a valid phone number.'
        })
        .min(10, {
            message: 'Phone number must be at least 10 characters.'
        }),
    supervisionTier: z.string({
        required_error: 'Please enter your supervision tier!'
    }).optional(),
    supervisionLevel: z.string({
        required_error: 'Please enter your supervision level!'
    }).optional(),
    address: z.string({
        required_error: 'Please enter your docket number!'
    }).optional(),
    courtAddress: z.string({
        required_error: 'Please enter your docket number!'
    }).optional(),
    communitySpaceAddress: z.string({
        required_error: 'Please enter your docket number!'
    }).optional(),
    caseManagerSchedule: z.string({
        required_error: 'Please enter your docket number!'
    }).optional()
})

type TClient = z.infer<typeof formSchema>

const EditClientForm = ({ data }: Props) => {

    const { clientCases, createdAt, updatedAt, id, dateOfBirth, ...editData } = data

    const { mutate: updateClient, isPending: isLoading } = useUpdateClientMutation()

    const form = useForm<TClient>({
        resolver: zodResolver(formSchema),
        defaultValues: { ...editData, dateOfBirth: new Date(dateOfBirth) }
    })

    function onSubmit(values: TClient) {
        console.log({ values })
        updateClient({
            id,
            ...values
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
                <div className='grid grid-cols-3 gap-x-10 gap-y-5'>
                    <InputElement name="firstName" placeholder="John" label="First Name" />
                    <InputElement name="lastName" placeholder="Wick" label="Last Name" />
                    <DatePickerElement name='dateOfBirth' label='Date Of Birth' />
                    <CustomInputElement name="email" label="Email" type="email" isDisabled />
                    <InputElement name="supervisionTier" label="Supervision Tier" />
                    <PhoneNumberInputElement name='phoneNumber' label='Phone Number' />
                    <InputElement name="supervisionLevel" label="Supervision Level" />
                    <InputElement name="address" label="Address" />
                    <InputElement name="courtAddress" label="Court Address" />
                    <InputElement name="communitySpaceAddress" label="Community Space Address" />
                    <InputElement name="caseManagerSchedule" label="Case Manager Schedule" />
                </div>
                <Button disabled={isLoading} type="submit" className='w-full'>
                    {isLoading ? 'Saving...' : 'Save changes'}
                </Button>
            </form>
        </Form>
    )
}

export default EditClientForm
