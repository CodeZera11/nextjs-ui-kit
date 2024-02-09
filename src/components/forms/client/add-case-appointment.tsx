import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client, TOption } from '@/constants/types'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useAddCaseAppointmentMutation, useAssignCaseManagerMutation } from '@/data/hooks/useClientsClient'
import { useEffect, useState } from 'react'
import SelectElement from '../elements/select-element'
import DatePickerElement from '../elements/date-picker-element'
import InputElement from '../elements/input-element'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Props {
  data: Client
}

const formSchema = z.object({
  caseId: z.string({
    required_error: 'Please select a case!'
  }),
  appointmentDate: z.date({
    required_error: 'Please select a appointment date!'
  }),
  note: z.string({
    required_error: 'Please enter a type!'
  }).optional(),
})

type TCaseAppointment = z.infer<typeof formSchema>

const AddCaseAppointmentForm = ({ data }: Props) => {

  const [caseOptions, setCaseOptions] = useState<TOption[]>()

  const { mutate: addCaseAppointment, isPending: isLoading } = useAddCaseAppointmentMutation()

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
    addCaseAppointment({
      id: data?.id,
      caseId: Number(values.caseId),
      date: values.appointmentDate,
      note: values.note
    })
    // console.log({ values })
  }

  const currentCase = form.watch('caseId')

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2 p-4">
          <div className='mb-5'>
            <SelectElement name="caseId" placeholder="Please select a case" label="Case" options={caseOptions || []} />
          </div>
          <DatePickerElement custom name='appointmentDate' label='Appointment Date' disabled={!currentCase} />

          <InputElement name="note" label="Note" isDisabled={!currentCase} />

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? 'Saving...' : 'Save changes'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AddCaseAppointmentForm
