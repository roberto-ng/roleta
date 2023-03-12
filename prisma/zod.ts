import { z } from "zod";

export const SorteioNumeroSchema = z.object({
    tipo: z.literal('numero'),
    nomes: z.string(),
});

export const SorteioNomeSchema = z.object({
    tipo: z.literal('nome'),
    numeroMin: z.number().int(),
    numeroMax: z.number().int(),
});