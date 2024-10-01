import { IPublicacao } from './IPublicacao';

export interface IRevista extends IPublicacao {
    edicao: string;
    editora: string;
}