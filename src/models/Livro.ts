import { ILivro } from "../interfaces/ILivro";
import { Publicacao } from "./Publicacao";

export class Livro extends Publicacao {
    private static totalDeLivrosCadastrados: number = 0;

    private isbn: string;
    private numeroPaginas: number;

    constructor(props: ILivro) {
        super(props);

        if (!props.isbn) throw new Error("ISBN inválido");
        if (props.numeroPaginas <= 0) throw new Error("Número de páginas deve ser maior que zero");

        this.isbn = props.isbn;
        this.numeroPaginas = props.numeroPaginas;

        Livro.totalDeLivrosCadastrados++;
    }

    public getInfo(): string {
        return [
            `Título: ${this.titulo}`,
            `Autor: ${this.autor}`,
            `Ano: ${this.anoPublicacao}`,
            `ISBN: ${this.isbn}`,
            `Páginas: ${this.numeroPaginas}`,
            `Disponível: ${this.verificarDisponibilidade()}`
        ].join(", ");
    }
    
    public static obterTotalDeLivrosCadastrados(): number {
        return Livro.totalDeLivrosCadastrados;
    }
}
