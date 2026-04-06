import { z } from "zod";

export const createProdutoSchema = z.object({
  nome: z.string({ error: "Nome é obrigatório" })
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(200, "Nome muito longo"),

  preco: z.number({ error: "Preço é obrigatório" })
    .positive("Preço deve ser maior que zero"),

  estoque: z.number({ error: "Estoque é obrigatório" })
    .int("Estoque deve ser inteiro")
    .min(0, "Estoque não pode ser negativo"),

  id_marca: z.number({ error: "Marca é obrigatória" })
    .int("Marca inválida")
    .positive("Marca inválida"),

  id_categoria: z.number({ error: "Categoria é obrigatória" })
    .int("Categoria inválida")
    .positive("Categoria inválida"),

  descricao: z.string({ error: "Descrição inválida" })
    .max(2000, "Descrição muito longa")
    .optional(),

  imagem: z.string({ error: "Imagem inválida" })
    .url("Imagem deve ser uma URL válida")
    .optional(),

  destaque: z.boolean({ error: "Campo destaque deve ser verdadeiro ou falso" }).optional(),
  ativo: z.boolean({ error: "Campo ativo deve ser verdadeiro ou falso" }).optional(),
});

export const updateProdutoSchema = z.object({
  nome: z.string({ error: "Nome inválido" })
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(200, "Nome muito longo")
    .optional(),

  preco: z.number({ error: "Preço inválido" })
    .positive("Preço deve ser maior que zero")
    .optional(),

  estoque: z.number({ error: "Estoque inválido" })
    .int("Estoque deve ser inteiro")
    .min(0, "Estoque não pode ser negativo")
    .optional(),

  id_marca: z.number({ error: "Marca inválida" })
    .int("Marca inválida")
    .positive("Marca inválida")
    .optional(),

  id_categoria: z.number({ error: "Categoria inválida" })
    .int("Categoria inválida")
    .positive("Categoria inválida")
    .optional(),

  descricao: z.string({ error: "Descrição inválida" })
    .max(2000, "Descrição muito longa")
    .optional(),

  imagem: z.string({ error: "Imagem inválida" })
    .url("Imagem deve ser uma URL válida")
    .optional(),

  destaque: z.boolean({ error: "Campo destaque deve ser verdadeiro ou falso" }).optional(),
  ativo: z.boolean({ error: "Campo ativo deve ser verdadeiro ou falso" }).optional(),
});