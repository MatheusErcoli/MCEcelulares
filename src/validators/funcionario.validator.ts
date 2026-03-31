import { z } from "zod";

export const createFuncionarioSchema = z.object({
  nome: z.string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),

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

  cargo: z.string()
    .min(1, "Cargo é obrigatório")
    .min(3, "Cargo deve ter pelo menos 3 caracteres"),

  salario: z.number()
    .positive("Salário deve ser maior que zero"),

  ativo: z.boolean().optional()
});

export const updateFuncionarioSchema = z.object({
  nome: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100)
    .optional(),

  email: z.string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido")
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

  cargo: z.string()
    .min(3, "Cargo deve ter pelo menos 3 caracteres")
    .optional(),

  salario: z.number()
    .positive("Salário deve ser maior que zero")
    .optional(),

  ativo: z.boolean().optional()
});