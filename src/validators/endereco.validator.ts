import { z } from "zod";

export const createEnderecoSchema = z.object({
  endereco: z.string({ error: "Endereço é obrigatório" })
    .trim()
    .min(1, "Endereço é obrigatório")
    .min(3, "Endereço muito curto")
    .max(255, "Endereço muito longo"),

  numero: z.string({ error: "Número é obrigatório" })
    .trim()
    .min(1, "Número é obrigatório")
    .max(20, "Número muito longo"),

  cidade: z.string({ error: "Cidade é obrigatória" })
    .trim()
    .min(1, "Cidade é obrigatória")
    .max(100, "Cidade muito longa"),

  estado: z.string({ error: "Estado é obrigatório" })
    .trim()
    .length(2, "Estado deve ter 2 letras"),

  cep: z.string({ error: "CEP é obrigatório" })
    .trim()
    .regex(/^\d{8}$/, "CEP deve conter 8 números"),

  complemento: z.string({ error: "Complemento inválido" })
    .trim()
    .max(255, "Complemento muito longo")
    .optional(),

  bairro: z.string({ error: "Bairro inválido" })
    .trim()
    .max(100, "Bairro muito longo")
    .optional(),
});

export const updateEnderecoSchema = z.object({
  endereco: z.string({ error: "Endereço inválido" })
    .trim()
    .min(3, "Endereço muito curto")
    .max(255, "Endereço muito longo")
    .optional(),

  numero: z.string({ error: "Número inválido" })
    .trim()
    .max(20, "Número muito longo")
    .optional(),

  complemento: z.string({ error: "Complemento inválido" })
    .trim()
    .max(255, "Complemento muito longo")
    .optional(),

  bairro: z.string({ error: "Bairro inválido" })
    .trim()
    .max(100, "Bairro muito longo")
    .optional(),

  cidade: z.string({ error: "Cidade inválida" })
    .trim()
    .max(100, "Cidade muito longa")
    .optional(),

  estado: z.string({ error: "Estado inválido" })
    .trim()
    .length(2, "Estado deve ter 2 letras")
    .optional(),

  cep: z.string({ error: "CEP inválido" })
    .trim()
    .regex(/^\d{8}$/, "CEP deve conter 8 números")
    .optional(),
});