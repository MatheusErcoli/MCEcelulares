import { z } from "zod";

export const createItemCarrinhoSchema = z.object({
  id_carrinho: z.coerce.number({ error: "Carrinho é obrigatório" })
    .int("Carrinho inválido")
    .positive("Carrinho inválido"),

  id_produto: z.coerce.number({ error: "Produto é obrigatório" })
    .int("Produto inválido")
    .positive("Produto inválido"),

  preco_unitario: z.coerce.number({ error: "Preço é obrigatório" })
    .positive("Preço deve ser maior que zero"),

  quantidade: z.coerce.number({ error: "Quantidade inválida" })
    .int("Quantidade deve ser inteira")
    .min(1, "Quantidade deve ser pelo menos 1")
    .default(1),
});

export const updateItemCarrinhoSchema = z.object({
  quantidade: z.coerce.number({ error: "Quantidade é obrigatória" })
    .int("Quantidade deve ser inteira")
    .default(1),
});