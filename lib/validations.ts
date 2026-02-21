import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter"),
  email: z.string().email("Geçerli e-posta giriniz"),
  company: z.string().optional(),
  sector: z.enum(["fintech", "ecommerce", "elearning", "enterprise", "other"]),
  message: z.string().min(20, "Mesaj en az 20 karakter"),
  budget: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
