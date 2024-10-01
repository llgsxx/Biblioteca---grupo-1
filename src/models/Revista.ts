import { IRevista } from '../interfaces/IRevista';
import { Publicacao } from './Publicacao';

export class Revista extends Publicacao {
    private static totalDeRevistasCadastradas: number = 0;

    private edicao: string;
    private editora: string;

    constructor(props: IRevista) {
        super(props);

        if (!props.edicao) throw new Error("Edição inválida");
        if (!props.editora) throw new Error("Editora inválida");

        this.edicao = props.edicao;
        this.editora = props.editora;

        Revista.totalDeRevistasCadastradas++;
    }

    public getInfo(): string {
        return [
            `Título: ${this.titulo}`,
            `Autor: ${this.autor}`,
            `Ano: ${this.anoPublicacao}`,
            `Edição: ${this.edicao}`,
            `Editora: ${this.editora}`,
            `Disponível: ${this.verificarDisponibilidade()}`
        ].join(", ");
    }

    public static obterTotalDeRevistasCadastradas(): number {
        return Revista.totalDeRevistasCadastradas;
    }
}
