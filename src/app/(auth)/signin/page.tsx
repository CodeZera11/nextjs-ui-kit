'use client'

import { CardHeader, CardContent, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomInputElement from '@/components/forms/elements/custom-input-element'
import { useSignIn } from '@/data/hooks/useAuthClient'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const formSchema = z.object({
  email: z.string({
    required_error: 'Please enter your email!'
  }),
  password: z.string({
    required_error: 'Please enter a password!'
  })
})

const Page = () => {
  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  const { isPending: isLoading, mutate: signInUser } = useSignIn()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (email) {
      form.setValue('email', email)
    }
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    signInUser({
      ...values
    })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8 dark:bg-gray-800">
      <Card className="mx-auto w-full max-w-md  bg-opacity-75">
        <CardHeader>
          <h1 className="text-center text-4xl font-bold">Sign In</h1>
          <p className="text-md text-center font-light">Welcome Back!</p>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 p-4">
              <div className="space-y-2">
                <CustomInputElement name="email" label="Email" type="email" />
              </div>
              <div className="space-y-2">
                <CustomInputElement name="password" label="Password" type="password" />
              </div>
              <Button disabled={isLoading} className="w-full" type="submit">
                {isLoading ? 'Loading...' : 'Sign In'}
              </Button>
              <p className="mt-4 text-center">
                Don&apos;t have an account?{' '}
                <Link className="text-primary underline" href={PageRoutes.SIGNUP}>
                  Create Account
                </Link>
              </p>
              <p className="mt-4 text-center">
                Forgot Password?{' '}
                <Link className="text-primary underline" href={PageRoutes.FORGOT_PASSWORD}>
                  Reset Password
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}

export default Page