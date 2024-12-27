import { z } from 'zod'

export const SignInSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter your email!'
    })
    .min(1, { message: 'Please enter your email!' })
    .email(),
  password: z
    .string({
      required_error: 'Please enter your password!'
    })
    .min(1, { message: 'Please enter your password!' })
})
export type TSignIn = z.infer<typeof SignInSchema>

export const SignUpSchema = z.object({
  firstName: z.string({
    required_error: 'Please enter your first name!'
  }),
  lastName: z.string({
    required_error: 'Please enter your last name!'
  }),
  dateOfBirth: z.date({
    required_error: 'Please enter your DOB'
  }),
  email: z
    .string({
      required_error: 'Please enter your email!'
    })
    .email({ message: 'Invalid email address' }),
  phoneNumber: z
    .string({
      required_error: 'Please enter a valid phone number.'
    })
    .min(10, {
      message: 'Phone number must be at least 10 characters.'
    }),
  password: z
    .string({
      required_error: 'Please enter a password!'
    })
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/,
      'Please enter a combination of uppercase letters, lowercase letters, numbers, and symbols.'
    )
})
export type TSignUp = z.infer<typeof SignUpSchema>

export const ForgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter your email!'
    })
    .min(1, 'Please enter your email!')
    .email()
})
export type TForgotPassword = z.infer<typeof ForgotPasswordSchema>
