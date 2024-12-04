import { z } from 'zod'

export const signupValidation = z.object({
    firstName: z.string({ required_error: "First name is required!" }).trim().min(1, { message: 'First name is required' }),
    lastName: z.string({ required_error: "Last name is required!" }).trim().min(1, { message: 'Last name is required' }),
    country: z.string({ required_error: "Country is required" }).trim().min(1, { message: 'Last name is required' }),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }).min(6, { message: 'Minimum 6 character required' }).max(24, { message: 'Max password length should be 24' }).trim(),
})

export const loginValidation = z.object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }).min(6, { message: 'Minimum 6 character required' }).max(24, { message: 'Max password length should be 24' }).trim(),
})