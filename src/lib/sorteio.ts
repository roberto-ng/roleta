import { randomInt } from "node:crypto";
import { Range, Set } from "immutable";
import { trampoline, ThunkOrValue as Result } from 'trampoline-ts';

type Numeros = Set<number>
type Nomes = Set<string> 

/** Função recursiva para gerar números aleatórios sem repetir */
export const gerarNumerosAleatorios = trampoline((
    min: number, 
    max: number, 
    quantidade: number, 
    resultados = Set<number>(),
): Result<Numeros | null> => {
    // número de valores possíveis
    const possibilidades = max + 1 - min; 
    if (quantidade > possibilidades) {
        // não há números o suficiente, retornar nulo
        return null;
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

/** Função recursiva para sortear nomes sem repetir */
export const sortearNomes = trampoline((
    nomes: string[], 
    quantidade: number, 
    resultados: Nomes = Set(),
): Result<Nomes | null> => {
    if (quantidade > nomes.length) {
        // não há números o suficiente, retornar nulo
        return null;
    }

    const indiceSorteado = randomInt(nomes.length);
    const nomeSorteado = nomes.at(indiceSorteado);

    if (nomeSorteado == null || resultados.includes(nomeSorteado)) {
        // veio um nome repetido, buscar outro
        return sortearNomes.cont(nomes, quantidade, resultados);
    }

    const novoResultados = resultados.add(nomeSorteado);
    if (novoResultados.size >= quantidade) {
        // encontramos todos os nomes, parar o loop
        return novoResultados;
    } else {
        return sortearNomes.cont(nomes, quantidade, novoResultados);
    }
});