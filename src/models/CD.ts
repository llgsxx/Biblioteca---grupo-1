import { Midia } from './Midia';
import { ICD } from '../interfaces/ICD';

export class CD extends Midia {
    private static totalDeCDsCadastrados: number = 0;

    private numeroFaixas: number;
    private artista: string;

    constructor(props: ICD) {
        super(props); 

        if (props.numeroFaixas <= 0) throw new Error("O número de faixas deve ser maior que zero.");

        this.numeroFaixas = props.numeroFaixas;
        this.artista = props.artista;

        CD.totalDeCDsCadastrados++;
    }


    public getInfo(): string {
        return [
            `CD: ${this.titulo}`,
            `Artista: ${this.artista}`,
            `Duração: ${this.duracao} minutos`,
            `Formato: ${this.formato}`,
            `Número de faixas: ${this.numeroFaixas}`,
            `Localização: Estante ${this.localizacao.estante}, Prateleira ${this.localizacao.prateleira}`,
            `Disponível: ${this.verificarDisponibilidade()}`
        ].join(", ");
    }

    public static obterTotalDeCDsCadastrados(): number {
        return CD.totalDeCDsCadastrados;
    }
}
