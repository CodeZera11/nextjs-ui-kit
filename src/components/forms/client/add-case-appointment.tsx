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
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface Props {
  data: Client
}

const formSchema = z.object({
  caseId: z.string({
    required_error: 'Please select a case!'
  }),
  caseDetails: z.array(
    z.object({
      note: z.string({
        required_error: 'Please enter a type!'
      }).optional(),
      appointmentDate: z.date({
        required_error: 'Please select a appointment date!'
      }),
      type: z.nativeEnum(AppointmentTypeEnum, { required_error: "Please select a type!" })
    })
  )
})

type TCaseAppointment = z.infer<typeof formSchema>

const AddCaseAppointmentForm = ({ data }: Props) => {

  const [caseOptions, setCaseOptions] = useState<TOption[]>();
  const [appointments, setAppointments] = useState(1);
  const [singleCase, setSingleCase] = useState(true);

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

  useEffect(() => {
    if (data?.clientCases?.length === 1) {
      setSingleCase(true);
      form.setValue("caseId", data?.clientCases[0].id.toString());
    } else {
      setSingleCase(false);
    }
  }, [data, form])

  function onSubmit(values: TCaseAppointment) {
    addCaseAppointment({
      id: data?.id,
      caseId: Number(values.caseId),
      caseDetails: values.caseDetails
    })
  }

  const currentCase = form.watch('caseId')

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2 p-4">
          <div className='mb-5'>
            {!singleCase && (
              <SelectElement name="caseId" placeholder="Please select a case" label="Case" options={caseOptions || []} />
            )}
          </div>
          <div className='space-y-4 max-h-[20rem] overflow-y-scroll'>
            {Array(appointments).fill(0).map((_, i) => {
              return (
                <Card key={i}>
                  <CardHeader className='text-xl font-semibold text-center bg-light_black rounded-t-xl text-white'>Appointment - {i + 1}</CardHeader>
                  <CardContent className='pt-5'>
                    <div className='flex items-center justify-between gap-2'>
                      <div className='flex-1'>
                        <DatePickerElement custom name={`caseDetails[${i}].appointmentDate`} label={`Appointment Date`} disabled={!currentCase} />
                      </div>

                      <div className='flex-1'>
                        <SelectElement label={`Type`} disabled={!currentCase} name={`caseDetails[${i}].type`} options={AppointmentTypeOptions} placeholder='Please select a type' />
                      </div>
                    </div>

                    <TextAreaElement
                      name={`caseDetails[${i}].note`}
                      label={`Note`}
                      isDisabled={!currentCase}
                      placeholder='Enter a note here'
                    />
                  </CardContent>
                </Card>
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
