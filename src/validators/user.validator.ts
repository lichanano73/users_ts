import { z } from 'zod';

export const UserSchema = z.object({
  first_name:   z.string().min(2),
  last_name:    z.string().min(2),
  gender:       z.enum(['Femenino', 'Masculino', 'No binario']),
  avatar:       z.string().url().optional(),
  birth:        z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Fecha inválida' }).optional(),
  contact:      z.string().min(8, { message: 'Número demasiado corto' }).regex(/^[0-9+\-\s()]*$/, { message: 'Formato de número inválido' }).optional().nullable(),
  email:        z.string().email(),
  password:     z.string().min(6),
  type:         z.string().optional()
});

export const NonSensitiveInfoUserShema = z.object({
  id:           z.number(),
  first_name:   z.string().min(2),
  avatar:       z.string().url().optional().nullable(),
  gender:       z.enum(['Femenino', 'Masculino', 'No binario']).optional(),
  email:        z.string().email(),
  birth:        z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Fecha inválida' }).optional().nullable(),
  contact:      z.string().min(8, { message: 'Número demasiado corto' }).regex(/^[0-9+\-\s()]*$/, { message: 'Formato de número inválido' }).optional().nullable(),
  type:         z.string().optional()
})
