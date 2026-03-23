import { z } from "zod";

export const createItemCarrinhoSchema = z.object({
  id_carrinho: z.coerce.number().int().positive(),
  id_produto: z.coerce.number().int().positive(),
  preco_unitario: z.coerce.number().positive(),
  quantidade: z.coerce.number().int().min(1)
});

export const updateItemCarrinhoSchema = z.object({
  id_carrinho: z.coerce.number().int().positive().optional(),
  id_produto: z.coerce.number().int().positive().optional(),
  preco_unitario: z.coerce.number().positive().optional(),
  quantidade: z.coerce.number().int().min(1).optional()
});
