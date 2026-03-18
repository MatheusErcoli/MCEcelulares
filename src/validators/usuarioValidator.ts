import { z } from "zod";

export const createUsuarioSchema = z.object({
  nome: z.string().min(3, "Nome deve conter pelo menos 3 caracteres").max(100),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),
  senha: z.string().min(6, "Senha deve conter pelo menos 6 caracteres"),
  cpf: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF inválido"),
  telefone: z.string().min(10, "Telefone inválido").max(15, "Telefone inválido").optional(),
  ativo: z.boolean().optional(),
  admin: z.boolean().optional(),
});

export const updateUsuarioSchema = z.object({
  nome: z.string().min(3).max(100).optional(),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido").optional(),
  senha: z.string().min(6).optional(),
  cpf: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF inválido"),
  telefone: z.string().min(10).max(15).optional(),
  ativo: z.boolean().optional(),
  admin: z.boolean().optional(),
});

export const loginUsuarioSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),
  senha: z.string().min(6),
});
