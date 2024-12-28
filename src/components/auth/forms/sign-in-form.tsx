'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { PageRoutes } from '@/constants/page-routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignIn } from '@/data/hooks/useAuthClient'
import { SignInSchema, TSignIn } from '@/constants/schemas'
import CustomInputElement from '@/components/forms/elements/custom-input-element'
import InputElement from '@/components/forms/elements/input-element'

interface SignInFormProps {
  prefillEmail?: string
}

const SignInForm: React.FC<SignInFormProps> = ({ prefillEmail }) => {

  const { isPending: isLoading, mutate: signInUser } = useSignIn()

  const form = useForm<TSignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: prefillEmail ?? ''
    }
  })

  function onSubmit(values: TSignIn) {
    signInUser({
      ...values
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 md:p-4">
        <InputElement
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <InputElement
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
        />
        <Button variant="secondary" disabled={isLoading} className="w-full" type="submit">
          {isLoading ? 'Loading...' : 'Sign In'}
        </Button>
        <div className='space-y-1'>
          <p className="text-center">
            Don't have an account?{' '}
            <Link
              className="text-muted underline"
              href={PageRoutes.SIGNUP + (prefillEmail ? `?email=${prefillEmail}` : '')}
            >
              Sign up
            </Link>
          </p>
          <p className="text-center">
            Forgot Password?{' '}
            <Link
              className="text-muted underline"
              href={PageRoutes.FORGOT_PASSWORD + (prefillEmail ? `?email=${prefillEmail}` : '')}
            >
              Reset Password
            </Link>
          </p>
        </div>
      </form>
    </Form >
  )
}

export default SignInForm