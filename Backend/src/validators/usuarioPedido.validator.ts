import { z } from "zod";

export const createUsuarioPedidoSchema = z.object({
  id_pedido: z
    .number({ error: "ID do pedido e obrigatorio" })
    .int("ID do pedido deve ser um numero inteiro")
    .positive("ID do pedido deve ser um numero positivo"),

  nome: z
    .string({ error: "Nome e obrigatorio" })
    .trim()
    .min(1, "Nome e obrigatorio")
    .max(255, "Nome muito longo"),

  email: z
    .string({ error: "Email e obrigatorio" })
    .trim()
    .email("Email invalido")
    .max(255, "Email muito longo"),

  cpf: z
    .string({ error: "CPF e obrigatorio" })
    .trim()
    .min(11, "CPF deve ter pelo menos 11 caracteres")
    .max(14, "CPF muito longo"),

  telefone: z
    .string({ error: "Telefone e obrigatorio" })
    .trim()
    .min(8, "Telefone muito curto")
    .max(20, "Telefone muito longo"),
});

export const updateUsuarioPedidoSchema = z.object({
  nome: z
    .string({ error: "Nome invalido" })
    .trim()
    .min(1, "Nome nao pode ficar vazio")
    .max(255, "Nome muito longo")
    .optional(),

  email: z
    .string({ error: "Email invalido" })
    .trim()
    .email("Email invalido")
    .max(255, "Email muito longo")
    .optional(),

  cpf: z
    .string({ error: "CPF invalido" })
    .trim()
    .min(11, "CPF deve ter pelo menos 11 caracteres")
    .max(14, "CPF muito longo")
    .optional(),

  telefone: z
    .string({ error: "Telefone invalido" })
    .trim()
    .min(8, "Telefone muito curto")
    .max(20, "Telefone muito longo")
    .optional(),
});
