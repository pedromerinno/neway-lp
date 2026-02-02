import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  cityState: z.string().min(2, "City/State is required"),
  typeOfInterest: z.string().min(1, "Please select an option"),
  approximateBudget: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
