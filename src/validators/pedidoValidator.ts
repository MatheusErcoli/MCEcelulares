import { z } from "zod";

export const createPedidoSchema = z.object({
  id_usuario: z.coerce.number().int().positive(),
  id_funcionario: z.coerce.number().int().positive().optional(),
  data: z.coerce.date().optional(),
  valor_total: z.coerce.number().nonnegative()
});

export const updatePedidoSchema = z.object({
  id_usuario: z.coerce.number().int().positive().optional(),
  id_funcionario: z.coerce.number().int().positive().optional(),
  data: z.coerce.date().optional(),
  valor_total: z.coerce.number().nonnegative().optional(),
  status: z.enum(["CRIADO","AGUARDANDO_PAGAMENTO","PAGO","ENVIADO","ENTREGUE","CANCELADO"]).optional()
});