import { z } from "zod";

export const createCarrinhoSchema = z.object({});

export const updateCarrinhoSchema = z.object({
  data_criacao: z.coerce.date({ error: "Data inválida" }).optional(),
  ativo: z.boolean({ error: "Campo ativo deve ser verdadeiro ou falso" }).optional(),
});