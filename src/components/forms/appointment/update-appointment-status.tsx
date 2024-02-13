import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Appointment } from '@/constants/types'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import SelectElement from '../elements/select-element'
import { useUpdateAppointmentStatusMutation } from '@/data/hooks/useCasesClient'
import { AppointmentStatusesEnum } from '@/constants/enums'
import { AppointmentStatusOptions } from '@/constants/appointment'

interface Props {
    data: Appointment
    caseNumber?: number
}

const formSchema = z.object({
    status: z.nativeEnum(AppointmentStatusesEnum, {
        required_error: 'Please select a status!'
    })
})

type TCaseManager = z.infer<typeof formSchema>

const UpdateAppointmentStatusForm = ({ data, caseNumber }: Props) => {

    const { isPending: isLoading, mutate: updateStatus } = useUpdateAppointmentStatusMutation(caseNumber);

    const form = useForm<TCaseManager>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: data?.status && data.status
        }
    })


    function onSubmit(values: TCaseManager) {
        updateStatus({
            id: data.id,
            status: values.status
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
                <SelectElement placeholder='Please select a status' name='status' label='Status' options={AppointmentStatusOptions} />
                <Button disabled={isLoading} type="submit" className='w-full'>
                    {isLoading ? 'Saving...' : 'Save changes'}
                </Button>
            </form>
        </Form>
    )
}

export default UpdateAppointmentStatusForm
