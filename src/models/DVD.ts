import { Midia } from './Midia';
import { IDVD } from '../interfaces/IDVD';

export class DVD extends Midia {
    private static totalDeDVDsCadastrados: number = 0;

    private resolucao: string;
    private regiao: string;

    constructor(props: IDVD) {
        super(props); 

        if (!props.resolucao) throw new Error("Resolução inválida.");
        if (!props.regiao) throw new Error("Região inválida.");

        this.resolucao = props.resolucao;
        this.regiao = props.regiao;

        DVD.totalDeDVDsCadastrados++;
    }

    public getInfo(): string {
        return [
            `DVD: ${this.titulo}`,
            `Resolução: ${this.resolucao}`,
            `Região: ${this.regiao}`,
            `Duração: ${this.duracao} minutos`,
            `Formato: ${this.formato}`,
            `Localização: Estante ${this.localizacao.estante}, Prateleira ${this.localizacao.prateleira}`,
            `Disponível: ${this.verificarDisponibilidade()}`
        ].join(", ");
    }

    public static obterTotalDeDVDsCadastrados(): number {
        return DVD.totalDeDVDsCadastrados;
    }
}
