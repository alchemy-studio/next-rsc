import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
});

export type User = z.infer<typeof userSchema>;
