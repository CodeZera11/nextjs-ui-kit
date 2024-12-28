'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { PageRoutes } from '@/constants/page-routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignUp } from '@/data/hooks/useAuthClient'
import { Button } from '@/components/ui/button'
import InputElement from '@/components/forms/elements/input-element'
import PhoneNumberInputElement from '@/components/forms/elements/phone-number-input'
import { SignUpSchema, TSignUp } from '@/constants/schemas'
import DatePickerElement from '@/components/forms/elements/date-picker-element'
import CustomInputElement from '@/components/forms/elements/custom-input-element'

interface SignUpFormProps {
  email?: string
  firstName?: string
  lastName?: string
}

const SignUpForm: React.FC<SignUpFormProps> = ({ email, firstName, lastName }) => {

  const { isPending: isLoading, mutate: createUser } = useSignUp()

  const form = useForm<TSignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: email ?? '',
      firstName: firstName ?? '',
      lastName: lastName ?? ''
    }
  })

  function onSubmit(values: TSignUp) {
    createUser({
      ...values
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 md:p-4">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5'>
          <InputElement
            name="firstName"
            label="First Name"
            placeholder="John"
          />
          <InputElement
            name="lastName"
            label="Last Name"
            placeholder="Wick"
          />
          <InputElement
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <PhoneNumberInputElement
            name="phoneNumber"
            label="Phone Number"
          />
          <DatePickerElement name='dateOfBirth' label='Date Of Birth' />
          <InputElement
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
          />
        </div>
        <Button
          variant="secondary"
          disabled={isLoading} className="w-full" type="submit">
          {isLoading ? 'Loading...' : 'Sign Up'}
        </Button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link
            className="text-muted underline"
            href={`${PageRoutes.SIGNIN}?email=${email ? email : ''}`}>
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  )
}

export default SignUpForm