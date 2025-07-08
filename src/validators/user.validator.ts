import { z } from 'zod';

export const UserSchema = z.object({
  first_name:   z.string().min(2),
  last_name:    z.string().min(2),
  gender:       z.enum(['Femenino', 'Masculino', 'No binario']),
  avatar:       z.string().url().optional(),
  birth:        z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Fecha inválida',
  }).optional(),
  email:        z.string().email(),
  password:     z.string().min(6),
});

export const NonSensitiveInfoUserShema = z.object({
  id:           z.number(),
  first_name:   z.string().min(2),
  avatar:       z.string().url().optional(),
  email:        z.string().email(),
})
