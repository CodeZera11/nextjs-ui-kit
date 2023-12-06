'use client'
import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SwitchElement from '@/components/forms/elements/switch-element'
import SelectElement from '@/components/forms/elements/select-element'
import { Amenities, CommercialTypes, PropertyTypes, ResidentalTypes, Statuses } from '@/constants/advertise'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'
import AmenitiesCheckbox from '@/components/forms/elements/checkbox-element'

const formSchema = z.object({
  property_type: z.string({
    required_error: "Please select a property type!"
  }),
  status: z.string({
    required_error: "Please select your property status"
  }),
  parking_spaces: z.string().optional(),
  airport_distance: z.string().optional(),
  metro_station: z.string().optional(),
  nearby_places: z.string().optional(),
  other_features: z.string().optional(),
})

const AmenitiesForm = ({ onSave }: { onSave: (step: number, values: any) => void }) => {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ personalForm: values })
    onSave(1, values)
  }

  console.log(form.getValues())

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-96 space-y-4 p-4 shadow-md"
      >
        <SelectElement
          name='property_type'
          label={"Property Type"}
          options={PropertyTypes}
        />

        <SelectElement
          name='status'
          label={"Status"}
          options={Statuses}
        />

        <InputElement name="parking_spaces" label={'Number of Parking Spaces'} />

        <AmenitiesCheckbox name='amenities' options={Amenities} />

        <InputElement name="airport_distance" label={'Distance from Airport (in km)'} />

        <InputElement name="metro_station" label={'Nearby Metro Station (in km)'} />

        <InputElement name="nearby_places" label={'Other Nearby Places'} />

        <InputElement name="other_features" label={'Other Main Features'} />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
      </form>
    </Form>
  )
}

export default AmenitiesForm