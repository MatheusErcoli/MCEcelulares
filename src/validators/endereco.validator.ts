import { z } from "zod";

export const createEnderecoSchema = z.object({
  id_usuario: z.number(),
  endereco: z.string().trim().min(3, "Endereço muito curto").max(255),
  numero: z.string().trim().min(1, "Número obrigatório").max(20),
  complemento: z.string().trim().max(255).optional(),
  bairro: z.string().trim().max(100).optional(),
  cidade: z.string().trim().max(100).optional(),
  estado: z.string().trim().length(2, "Estado deve ter 2 letras").optional(),
  cep: z.string().trim().regex(/^\d{8}$/, "CEP deve conter 8 números").optional(),
});
export const updateEnderecoSchema = z.object({
  id_usuario: z.number().optional(),
  endereco: z.string().trim().min(3).max(255).optional(),
  numero: z.string().trim().max(20).optional(),
  complemento: z.string().trim().max(255).optional(),
  bairro: z.string().trim().max(100).optional(),
  cidade: z.string().trim().max(100).optional(),
  estado: z.string().trim().length(2).optional(),
  cep: z.string().trim().regex(/^\d{8}$/).optional(),
});