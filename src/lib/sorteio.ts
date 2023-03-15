import { randomInt } from "node:crypto";
import { Range, Set } from "immutable";
import { trampoline, ThunkOrValue as Result } from 'trampoline-ts';

type Numeros = Set<number>

/** Função recursiva para gerar números aleatórios sem repetir */
export const gerarNumerosAleatorios = trampoline((
    min: number, 
    max: number, 
    quantidade: number, 
    resultados = Set<number>(),
): Result<Numeros> => {
    // número de valores possíveis
    const possibilidades = max + 1 - min; 
    if (quantidade > possibilidades) {
        // não há números o suficiente, retornar um set vazio
        return Set();
    }

    // gerar número aleatório
    const resultado = randomInt(min, max + 1);

    if (resultados.has(resultado)) {
        // veio um número repetido, buscar outro
        return gerarNumerosAleatorios.cont(min, max, quantidade, resultados);
    }

    const novoResultados = resultados.add(resultado);
    if (novoResultados.size >= quantidade) {
        // encontramos todos os números, parar o loop
        return novoResultados;
    } else {
        // gerar o próximo número
        return gerarNumerosAleatorios.cont(min, max, quantidade, novoResultados);
    }
})