export type props  = {
    LIVRO: { 
        isbn: string; 
        titulo: string; 
        autor: string; 
        anoPublicacao: number; 
        numeroPaginas: number; 
    } | undefined,
    REVISTA: { 
        titulo: string; 
        autor: string; 
        anoPublicacao: number; 
        edicao: string; 
        editora: string; 
    } | undefined,
    CD: {
        titulo: string;
        duracao: number;
        formato: string;
        artista: string;
        numeroFaixas: number;
    } | undefined,
    DVD: {
        titulo: string;
        duracao: number;
        formato: string;
        resolucao: string;
        regiao: string;
    } | undefined
};