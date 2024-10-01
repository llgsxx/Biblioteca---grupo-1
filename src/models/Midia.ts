import { IMidia } from '../interfaces/IMidia';
import { ItemAcervo } from './ItemAcervo';

export abstract class Midia extends ItemAcervo {
    protected duracao: number;
    protected formato: string;

    constructor(props: IMidia) {
        super(props);
        
        if (props.duracao <= 0) throw new Error("A duração deve ser maior que zero.");

        this.duracao = props.duracao;
        this.formato = props.formato;
    }

    abstract getInfo(): string;
}
