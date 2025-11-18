import z from 'zod';

export const formSchema = z.object({
  code: z.string().min(4, 'El código debe tener 4 caracteres').max(4, 'El código debe tener 4 caracteres'),
});
export type FormData = z.infer<typeof formSchema>;

export const enchufeSchema = z.object({
  codigo: z.number(),
  mensaje: z.string(),
  contenido: z.object({
    id: z.number(),
    nombre: z.string(),
    codigoAcceso: z.string(),
    voltaje: z.number(),
    estado: z.boolean(),
  })
});

export type EnchufeData = z.infer<typeof enchufeSchema>;