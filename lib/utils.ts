import { randomInt } from "node:crypto";
import { Range, Set } from "immutable";
import { trampoline, ThunkOrValue } from 'trampoline-ts';

/** Função recursiva para gerar números aleatórios sem repetir */
export const gerarNumerosAleatorios = trampoline((
    min: number, 
    max: number, 
    quantidade: number, 
    encontrados: Set<number> = Set(),
): ThunkOrValue<Set<number>> => {
    // gerar número aleatório
    const resultado = randomInt(min, max);

    if (encontrados.has(resultado)) {
        // veio um número repetido, buscar outro
        return gerarNumerosAleatorios.cont(min, max, quantidade, encontrados);
    }

    const novoEncontrados = encontrados.add(resultado);
    if (novoEncontrados.size >= quantidade) {
        // encontramos todos os números, parar o loop
        return novoEncontrados;
    } else {
        // gerar o próximo número
        return gerarNumerosAleatorios.cont(min, max, quantidade, novoEncontrados);
    }
})