import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client, TOption } from '@/constants/types'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useAssignCaseManagerMutation } from '@/data/hooks/useClientsClient'
import { useEffect, useState } from 'react'
import SelectElement from '../elements/select-element'
import DatePickerElement from '../elements/date-picker-element'

interface Props {
  data: Client
}

const formSchema = z.object({
  caseId: z.string({
    required_error: 'Please select a case!'
  }),
  appointmentDate: z.string({
    required_error: 'Please select a case manager!'
  })
})

type TCaseAppointment = z.infer<typeof formSchema>

const AddCaseAppointmentForm = ({ data }: Props) => {

  const [caseOptions, setCaseOptions] = useState<TOption[]>()

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
  }, [data?.clientCases])

  const form = useForm<TCaseAppointment>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values: TCaseAppointment) {
    // assignCaseManager({
    //   id: data?.id,
    //   caseId: Number(values.caseId)
    // })
    console.log({ values })
  }

  const currentCase = form.watch('caseId')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <SelectElement name="caseId" placeholder="Please select a case" label="Case" options={caseOptions || []} />
        <DatePickerElement custom name='appointment' label='Appointment Date' disabled={!currentCase} />
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
    </Form>
  )
}

export default AddCaseAppointmentForm
