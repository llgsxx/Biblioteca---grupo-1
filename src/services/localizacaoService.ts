type TipoItem = 'L' | 'C' | 'D' | 'R';

const localizacaoAtual: Record<TipoItem, { estante: number; prateleira: number }> = {
    L: { estante: 1, prateleira: 0 },  
    C: { estante: 1, prateleira: 0 },  
    D: { estante: 1, prateleira: 0 },  
    R: { estante: 1, prateleira: 0 },  
};

export function gerarProximaLocalizacao(tipo: TipoItem): { estante: string, prateleira: string } {
    const letra = tipo;

    if (!localizacaoAtual[letra]) {
        throw new Error(`Tipo de item inválido: ${tipo}`);
    }

    const localizacao = localizacaoAtual[letra];
     
    localizacao.prateleira += 1;

    if (localizacao.prateleira > 10) {
        localizacao.prateleira = 1;
        localizacao.estante += 1;
    }

    return {
        estante: `${letra}${localizacao.estante}`,  
        prateleira: `${localizacao.prateleira}` 
    };
}


