import { z } from 'zod';


// AUTH SCHEMAS
export const signUpSchema = z.object({
    email: z.email('Invalid email ID'),
    password: z.string().min(8, "Password must be atleast 8 characters long."),
    name: z.string().min(2, "Name must be atleast 2 characters long.")
})

export const signInSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
})

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.email().optional(),
  image: z.url().optional(),
});

export const userIdSchema = z.object({
  id: z.uuid('Invalid user ID'),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;