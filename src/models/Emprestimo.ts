import { ItemAcervo } from "./ItemAcervo";

export class Emprestimo {
  public item: ItemAcervo;
  public dataEmprestimo: Date;
  public dataDevolucao: Date | null;

  constructor(item: ItemAcervo) {
    this.item = item;
    this.dataEmprestimo = new Date();
    this.dataDevolucao = null;
  }

  public devolver(): void {
    this.dataDevolucao = new Date();
    this.item.disponivel = true;
  }
}
