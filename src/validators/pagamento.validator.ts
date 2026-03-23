import { z } from "zod";

export const createPagamentoSchema = z.object({
  id_pedido: z.coerce.number().int().positive(),
  metodo_pagamento: z.string().min(1),
  valor: z.coerce.number().positive(),
  data_pagamento: z.coerce.date().optional(),
  status: z.enum(["PENDENTE","PROCESSANDO","PAGO","RECUSADO","CANCELADO"]).optional()
});

export const updatePagamentoSchema = z.object({
  id_pedido: z.coerce.number().int().positive().optional(),
  metodo_pagamento: z.string().min(1).optional(),
  valor: z.coerce.number().positive().optional(),
  data_pagamento: z.coerce.date().optional(),
  status: z.enum(["PENDENTE","PROCESSANDO","PAGO","RECUSADO","CANCELADO"]).optional()
});