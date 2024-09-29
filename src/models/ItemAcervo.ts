import { IItemAcervo } from "../interfaces/IItemAcervo";
import { ILocalizavel } from "../interfaces/ILocalizavel";

export abstract class ItemAcervo implements ILocalizavel {
    
    private static totalDeItemsCadastrados: number = 0;

    public id: number;
    public titulo: string;
    public disponivel: boolean;
    public localizacao: {
        estante: string;
        prateleira: string;
    };

    constructor(props: IItemAcervo) {
        
        if (!props.titulo) {
            throw new Error("O título do item não pode ser vazio");
        }

        this.id = props.id;
        this.titulo = props.titulo;
        this.disponivel = props.disponivel;
        this.localizacao = props.localizacao;

        ItemAcervo.totalDeItemsCadastrados++;
    }

    abstract getInfo(): string;

    public verificarDisponibilidade(): boolean {
        return this.disponivel;
    }

    public getLocalizacao(): string {
        return `Estante: ${this.localizacao.estante}, Prateleira: ${this.localizacao.prateleira}`;
    }

    public static obterTotalDeItemsCadastrados(): number {
        return ItemAcervo.totalDeItemsCadastrados;
    }
}
