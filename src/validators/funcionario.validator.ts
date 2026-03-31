import { z } from "zod";

export const createFuncionarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().min(1, "Email é obrigatório").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),
  telefone: z.string().min(1, "Telefone é obrigatório").min(8, "telefone deve ter pelo menos 8 caracteres"),
  cargo: z.string().min(1, "Cargo é obrigatório").min(3, "Cargo deve ter pelo menos 3 caracteres"),
  data_admissao: z.coerce.date().optional(),
  salario: z.coerce.number().nonnegative(),
  ativo: z.boolean(),
});

export const updateFuncionarioSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100)
    .optional(),

  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido")
    .optional(),
  telefone: z.string().min(8).optional(),
  cargo: z.string().min(2).optional(),
  data_admissao: z.coerce.date().optional(),
  salario: z.coerce.number().nonnegative().optional(),
  ativo: z.boolean().optional(),
});
