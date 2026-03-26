import { z } from "zod";

export const createFuncionarioSchema = z.object({
  nome: z.string().min(3),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),
  telefone: z.string().min(8),
  cargo: z.string().min(2),
  data_admissao: z.coerce.date().optional(),
  salario: z.coerce.number().nonnegative(),
  ativo: z.boolean(),
});

export const updateFuncionarioSchema = z.object({
  nome: z.string().min(3).optional(),
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
