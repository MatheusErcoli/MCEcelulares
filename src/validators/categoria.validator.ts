import { z } from "zod";

export const createCategoriaSchema = z.object({
  nome: z.string().trim().min(1, "Nome da categoria é obrigatório").min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
  descricao: z.string().trim().max(255, "Descrição muito longa").optional(),
  ativo: z.boolean().optional()
});

export const updateCategoriaSchema = z.object({
  nome: z.string().trim().min(1, "Nome da categoria é obrigatório").min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo").optional(),
  descricao: z.string().trim().max(255, "Descrição muito longa").optional(),
  ativo: z.boolean().optional()
});