import { z } from "zod";

export const createUsuarioSchema = z.object({
  nome: z.string({ error: "Nome é obrigatório" })
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve conter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),

  email: z.string({ error: "Email é obrigatório" })
    .min(1, "Email é obrigatório")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),

  senha: z.string({ error: "Senha é obrigatória" })
    .min(1, "Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "Deve conter um caractere especial"),

  cpf: z.string({ error: "CPF é obrigatório" })
    .min(1, "CPF é obrigatório")
    .regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF inválido"),

  telefone: z.string({ error: "Telefone é obrigatório" })
    .min(10, "Telefone inválido")
    .max(15, "Telefone inválido"),

  ativo: z.boolean({ error: "Campo ativo deve ser verdadeiro ou falso" }).optional(),
  admin: z.boolean({ error: "Campo admin deve ser verdadeiro ou falso" }).optional(),
});

export const updateUsuarioSchema = z.object({
  nome: z.string({ error: "Nome inválido" })
    .min(3, "Nome deve conter pelo menos 3 caracteres")
    .max(100, "Nome muito longo")
    .optional(),

  email: z.string({ error: "Email inválido" }).optional(),

  senha: z.string({ error: "Senha inválida" })
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "Deve conter um caractere especial")
    .optional(),

  cpf: z.string({ error: "CPF inválido" })
    .regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF inválido")
    .optional(),

  telefone: z.string({ error: "Telefone inválido" })
    .min(10, "Telefone inválido")
    .max(15, "Telefone inválido")
    .optional(),

  ativo: z.boolean({ error: "Campo ativo deve ser verdadeiro ou falso" }).optional(),
  admin: z.boolean({ error: "Campo admin deve ser verdadeiro ou falso" }).optional(),
});

export const loginUsuarioSchema = z.object({
  email: z.string({ error: "Email é obrigatório" })
    .min(1, "Email é obrigatório")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),

  senha: z.string({ error: "Senha é obrigatória" })
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
});