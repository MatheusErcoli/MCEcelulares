import { z } from "zod";

export const createItemPedidoSchema = z.object({
  id_pedido: z.coerce.number({ error: "Pedido é obrigatório" })
    .int("Pedido inválido")
    .positive("Pedido inválido"),

  id_produto: z.coerce.number({ error: "Produto é obrigatório" })
    .int("Produto inválido")
    .positive("Produto inválido"),

  quantidade: z.coerce.number({ error: "Quantidade é obrigatória" })
    .int("Quantidade deve ser inteira")
    .min(1, "Quantidade deve ser pelo menos 1"),

  preco_unitario: z.coerce.number({ error: "Preço é obrigatório" })
    .positive("Preço deve ser maior que zero"),
});

export const updateItemPedidoSchema = z.object({
  id_pedido: z.coerce.number({ error: "Pedido inválido" })
    .int("Pedido inválido")
    .positive("Pedido inválido")
    .optional(),

  id_produto: z.coerce.number({ error: "Produto inválido" })
    .int("Produto inválido")
    .positive("Produto inválido")
    .optional(),

  quantidade: z.coerce.number({ error: "Quantidade inválida" })
    .int("Quantidade deve ser inteira")
    .min(1, "Quantidade deve ser pelo menos 1")
    .optional(),

  preco_unitario: z.coerce.number({ error: "Preço inválido" })
    .positive("Preço deve ser maior que zero")
    .optional(),
});