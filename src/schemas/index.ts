import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid Email."),
  password: z.string().min(6, {
    message: "A Valid password is required.",
  }),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  dob: z.date(),
  email: z.string().email(),
  address1: z.string(),
  address2: z.optional(z.string()),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postal_code: z.string(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  confirm_password: z.string().min(1, {
    message: "Confirm Password is required.",
  }),
});

export const resetSchema = z.object({
  email: z.string().email(),
});

export const newPasswordSchema = z.object({
  password: z.string(),
  confirm_password: z.string(),
});
