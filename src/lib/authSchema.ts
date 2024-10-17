import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

export const signUpSchema = signInSchema
  .extend({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long' }),
    confirmPassword: z.string().min(6, {
      message: 'Confirm password must be at least 6 characters long',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  })
