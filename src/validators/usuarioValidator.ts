import { z } from "zod";

export const createUsuarioSchema = z.object({
    nome: z.string().min(3, "Nome deve conter pelo menos 3 caracteres").max(100),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve conter pelo menos 6 caracteres"),
    cpf: z.string().min(11, "CPF deve conter pelo menos 11 caracteres"),
    telefone: z.string().min(10, "Telefone inválido").max(15, "Telefone inválido").optional(),
    ativo: z.boolean().optional(),
    admin: z.boolean().optional(),
});

export const updateUsuarioSchema = z.object({
    nome: z.string().min(3).max(100).optional(),
    email: z.string().email().optional(),
    senha: z.string().min(6).optional(),
    cpf: z.string().length(11).optional(),
    telefone: z.string().min(10).max(15).optional(),
    ativo: z.boolean().optional(),
    admin: z.boolean().optional()
});

export const loginUsuarioSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6)
});