import { IPublicacao } from './IPublicacao';

export interface ILivro extends IPublicacao {
    isbn: string;
    numeroPaginas: number;
}
