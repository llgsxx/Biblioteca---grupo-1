export interface IItemAcervo {
    id: number;
    titulo: string;
    disponivel: boolean;
    localizacao: {
        estante: string;
        prateleira: string;
    };
}