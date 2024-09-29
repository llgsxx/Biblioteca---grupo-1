import { IPublicacao } from "../interfaces/IPublicacao";
import { ItemAcervo } from "./ItemAcervo"; 


export abstract class Publicacao extends ItemAcervo {
    protected autor: string;
    protected anoPublicacao: number;

    constructor(props: IPublicacao) {
        super(props);
        this.autor = props.autor;
        this.anoPublicacao = props.anoPublicacao;
    }

    abstract getInfo(): string;
}
