'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { PageRoutes } from '@/constants/page-routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForgotPassword } from '@/data/hooks/useAuthClient'
import InputElement from '@/components/forms/elements/input-element'
import { ForgotPasswordSchema, TForgotPassword } from '@/constants/schemas'

interface ForgotPasswordFormProps {
  prefillEmail?: string
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ prefillEmail }) => {
  const { isPending: isLoading, mutate: forgotPassword } = useForgotPassword()

  const form = useForm<TForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: prefillEmail ?? ''
    }
  })

  function onSubmit(values: TForgotPassword) {
    forgotPassword({
      ...values
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 md:px-4">
        <InputElement
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? 'Sending...' : 'Send Email'}
        </Button>
        <div className="mt-4 text-center text-sm">
          Remember your password?{' '}
          <Link className="text-muted underline" href={PageRoutes.SIGNIN}>
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm