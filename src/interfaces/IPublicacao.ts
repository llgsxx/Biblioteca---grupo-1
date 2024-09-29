import { IItemAcervo } from "../interfaces/IItemAcervo";

export interface IPublicacao extends IItemAcervo {
    autor: string;
    anoPublicacao: number;
}
