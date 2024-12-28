"use client"

import * as z from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { PageRoutes } from '@/constants/page-routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useResetPassword } from '@/data/hooks/useAuthClient'
import InputElement from '@/components/forms/elements/input-element'

const formSchema = z.object({
  newPassword: z.string({
    required_error: 'Please enter your new password!'
  }),
  confirmNewPassword: z.string({
    required_error: 'Please re-enter your password'
  })
}).refine(
  (values) => {
    return values.newPassword === values.confirmNewPassword
  },
  {
    message: 'Passwords do not match!',
    path: ['confirmNewPassword']
  }
)

interface ResetPasswordFormProps {
  resetToken: string
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ resetToken }) => {

  const { isPending: isLoading, mutate: resetPassword } = useResetPassword()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    resetPassword({
      ...values,
      resetPasswordToken: resetToken
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 px-4">
        <div className="space-y-2">
          <InputElement name="newPassword" label="New Password" type="password" />
        </div>
        <div className="space-y-2">
          <InputElement name="confirmNewPassword" label="Confirm Password" type="password" />
        </div>
        <Button
          variant="secondary"
          disabled={isLoading} className="w-full" type="submit">
          {isLoading ? 'Saving...' : 'Save Changes'}
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

export default ResetPasswordForm