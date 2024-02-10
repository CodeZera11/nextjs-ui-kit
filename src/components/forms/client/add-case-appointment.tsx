import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client, TOption } from '@/constants/types'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import SelectElement from '../elements/select-element'
import DatePickerElement from '../elements/date-picker-element'
import { useAddCaseAppointmentMutation } from '@/data/hooks/useCasesClient'
import { AppointmentTypeOptions } from '@/constants/appointment'
import TextAreaElement from '../elements/text-area-element'
import { AppointmentTypeEnum } from '@/constants/enums'

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
  type: z.nativeEnum(AppointmentTypeEnum, { required_error: "Please select a type!" })
})

type TCaseAppointment = z.infer<typeof formSchema>

const AddCaseAppointmentForm = ({ data }: Props) => {

  const [caseOptions, setCaseOptions] = useState<TOption[]>();
  const [appointments, setAppointments] = useState(1);

  console.log({ appointments })

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
  }

  const currentCase = form.watch('caseId')

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2 p-4">
          <div className='mb-5'>
            <SelectElement name="caseId" placeholder="Please select a case" label="Case" options={caseOptions || []} />
          </div>
          <div className='space-y-2'>
            {Array(appointments).fill().map((_, i) => {
              console.log({ i })
              return (
                <>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='flex-1'>
                      <DatePickerElement custom name='appointmentDate' label={`Appointment Date (${i})`} disabled={!currentCase} />
                    </div>

                    <div className='flex-1'>
                      <SelectElement label={`Type (${i})`} disabled={!currentCase} name='type' options={AppointmentTypeOptions} placeholder='Please select a type' />
                    </div>
                  </div>

                  <TextAreaElement
                    name="note"
                    label={`Note (${i})`}
                    isDisabled={!currentCase}
                    placeholder='Enter a note here'
                  />
                </>
              )
            })}
          </div>

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? 'Saving...' : 'Save changes'}
          </Button>
          <Button type='button' className='w-full flex items-end justify-end' variant="link" onClick={() => setAppointments(appointments + 1)}>Add Appointment</Button>
        </form>
      </Form>
    </div>
  )
}

export default AddCaseAppointmentForm
