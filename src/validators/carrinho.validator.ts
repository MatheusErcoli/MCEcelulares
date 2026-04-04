import { z } from "zod";
 
export const createCarrinhoSchema = z.object({
  id_usuario: z.coerce.number(),
});
 
export const updateCarrinhoSchema = z.object({
  id_usuario: z.coerce.number().optional(),
  data_criacao: z.coerce.date().optional(),
  ativo: z.boolean().optional()
});