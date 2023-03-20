import { z } from "zod";

export const SorteioNumeroSchema = z.object({
    tipo: z.literal('numero'),
    userEmail: z.string().email(),
    numeroMin: z.number().int(),
    numeroMax: z.number().int(),
    resultado: z.string(),
    quantidade: z.number().max(10).optional(),
    data: z.string(),
});

export const SorteioNomeSchema = z.object({
    tipo: z.literal('nome'),
    userEmail: z.string().email(),
    nomes: z.string(),
    resultado: z.string(),
    data: z.string(),
});