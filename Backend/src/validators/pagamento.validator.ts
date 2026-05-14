import { z } from "zod";

export const createPagamentoSchema = z.object({
  id_pedido: z.coerce.number({ error: "Pedido é obrigatório" })
    .int("Pedido inválido")
    .positive("Pedido inválido"),

  metodo_pagamento: z.string({ error: "Método de pagamento é obrigatório" })
    .min(1, "Método de pagamento é obrigatório"),

  valor: z.coerce.number({ error: "Valor é obrigatório" })
    .positive("Valor deve ser maior que zero"),

  data_pagamento: z.coerce.date({ error: "Data de pagamento inválida" }).optional(),

  status: z.enum(["PENDENTE", "PROCESSANDO", "PAGO", "RECUSADO", "CANCELADO"], {
    error: "Status inválido",
  }).optional(),
});

export const updatePagamentoSchema = z.object({
  id_pedido: z.coerce.number({ error: "Pedido inválido" })
    .int("Pedido inválido")
    .positive("Pedido inválido")
    .optional(),

  metodo_pagamento: z.string({ error: "Método de pagamento inválido" })
    .min(1, "Método de pagamento é obrigatório")
    .optional(),

  valor: z.coerce.number({ error: "Valor inválido" })
    .positive("Valor deve ser maior que zero")
    .optional(),

  data_pagamento: z.coerce.date({ error: "Data de pagamento inválida" }).optional(),

  status: z.enum(["PENDENTE", "PROCESSANDO", "PAGO", "RECUSADO", "CANCELADO"], {
    error: "Status inválido",
  }).optional(),
});