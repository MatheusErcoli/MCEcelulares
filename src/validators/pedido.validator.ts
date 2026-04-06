import { z } from "zod";

export const createPedidoSchema = z.object({
  id_endereco: z.coerce.number({ error: "Endereço é obrigatório" })
    .int("Endereço inválido")
    .positive("Endereço inválido"),

  valor_total: z.coerce.number({ error: "Valor total é obrigatório" })
    .nonnegative("Valor total não pode ser negativo"),

  data: z.coerce.date({ error: "Data inválida" }).optional(),
});

export const updatePedidoSchema = z.object({
  id_endereco: z.coerce.number({ error: "Endereço inválido" })
    .int("Endereço inválido")
    .positive("Endereço inválido")
    .optional(),

  valor_total: z.coerce.number({ error: "Valor total inválido" })
    .nonnegative("Valor total não pode ser negativo")
    .optional(),

  data: z.coerce.date({ error: "Data inválida" }).optional(),

  status: z.enum(["AGUARDANDO_PAGAMENTO", "PAGO", "ENVIADO", "ENTREGUE", "CANCELADO"], {
    error: "Status inválido",
  }).optional(),
});