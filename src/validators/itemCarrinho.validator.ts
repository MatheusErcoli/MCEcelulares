import { z } from "zod";

export const createItemCarrinhoSchema = z.object({
  id_carrinho: z.coerce.number().int().positive(),
  id_produto: z.coerce.number().int().positive(),
  preco_unitario: z.coerce.number().positive(),
});

export const updateItemCarrinhoSchema = z.object({
  quantidade: z.coerce.number().int().optional(),
});