import { z } from "zod";

export const SorteioNumeroSchema = z.object({
    tipo: z.literal('numero'),
    numeroMin: z.number().int(),
    numeroMax: z.number().int(),
    resultado: z.string(),
    quantidade: z.number().max(10).optional(),
    data: z.string(),
});

export const SorteioNomeSchema = z.object({
    tipo: z.literal('nome'),
    nomes: z.string(),
    resultado: z.string(),
});