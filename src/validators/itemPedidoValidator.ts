import { z } from "zod";

export const createItemPedidoSchema = z.object({
  id_pedido: z.coerce.number().int().positive(),
  id_produto: z.coerce.number().int().positive(),
  quantidade: z.coerce.number().int().min(1),
  preco_unitario: z.coerce.number().positive()
});

export const updateItemPedidoSchema = z.object({
  id_pedido: z.coerce.number().int().positive().optional(),
  id_produto: z.coerce.number().int().positive().optional(),
  quantidade: z.coerce.number().int().min(1).optional(),
  preco_unitario: z.coerce.number().positive().optional()
});