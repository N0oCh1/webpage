import z from 'zod';

export const formSchema = z.object({
  code: z.string().min(4, 'El código debe tener 4 caracteres').max(4, 'El código debe tener 4 caracteres'),
});
export type FormData = z.infer<typeof formSchema>;