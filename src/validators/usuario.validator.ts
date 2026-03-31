import { z } from "zod";

export const createUsuarioSchema = z.object({
  nome: z.string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve conter pelo menos 3 caracteres")
    .max(100),

  email: z.string()
    .min(1, "Email é obrigatório")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),

  senha: z.string()
    .min(1, "Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "Deve conter um caractere especial"),

  cpf: z.string()
    .min(1, "CPF é obrigatório")
    .regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF inválido"),

  telefone: z.string()
    .min(10, "Telefone inválido")
    .max(15, "Telefone inválido")
    .optional(),

  ativo: z.boolean().optional(),
  admin: z.boolean().optional(),
});

export const updateUsuarioSchema = z.object({
  nome: z.string()
    .min(3, "Nome deve conter pelo menos 3 caracteres")
    .max(100)
    .optional(),

  senha: z.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "Deve conter um caractere especial")
    .optional(),

  cpf: z.string()
    .regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF inválido")
    .optional(),

  telefone: z.string()
    .min(10, "Telefone inválido")
    .max(15, "Telefone inválido")
    .optional(),

  ativo: z.boolean().optional(),
  admin: z.boolean().optional(),
});

export const loginUsuarioSchema = z.object({
  email: z.string()
    .min(1, "Email é obrigatório")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),

  senha: z.string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
});