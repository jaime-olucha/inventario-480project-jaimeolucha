import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Contraseña obligatoria"),
});

export type LoginFormData = z.infer<typeof loginSchema>;