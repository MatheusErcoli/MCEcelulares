import { z } from "zod";

export const createProdutoSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(200, "Nome muito longo"),
  descricao: z.string().max(2000, "Descrição muito longa").optional(),
  preco: z.number({}).positive("Preço deve ser maior que zero"),
  estoque: z
    .number()
    .int("Estoque deve ser inteiro")
    .min(0, "Estoque não pode ser negativo"),
  imagem: z.string().url("Imagem deve ser uma URL válida").optional(),
  destaque: z.boolean().optional(),
  ativo: z.boolean().optional(),
  id_marca: z.number().int("Marca inválida"),
  id_categoria: z.number().int("Categoria inválida"),
});

export const updateProdutoSchema = z.object({
  nome: z.string().min(3).max(150).optional(),
  descricao: z.string().max(2000).optional(),
  preco: z.number().positive().optional(),
  estoque: z.number().int().min(0).optional(),
  imagem: z.string().url().optional(),
  destaque: z.boolean().optional(),
  ativo: z.boolean().optional(),
  id_marca: z.number().int().optional(),
  id_categoria: z.number().int().optional(),
});
