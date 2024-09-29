import acervo from "../db/acervo";
import { ItemAcervo } from "../models/ItemAcervo";
import { props } from "../types";

export class Biblioteca {
  public registrarItem<T extends ItemAcervo>(item: T): void {
    acervo.push(item);
  }

  public obterItemPorId(id: number): ItemAcervo | undefined {
    const item = acervo.find((item) => item.id === id);
    return item;
  }

  public atualizarItem(
    id: number,
    dadosAtualizados: props
  ): ItemAcervo | false {
    const index = acervo.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }
    const itemAtual = acervo[index];

    if (dadosAtualizados.LIVRO) {
      const livroAtualizado = dadosAtualizados.LIVRO;
      Object.assign(itemAtual, livroAtualizado);
    }

    if (dadosAtualizados.REVISTA) {
      const revistaAtualizado = dadosAtualizados.REVISTA;
      Object.assign(itemAtual, revistaAtualizado);
    }

    if (dadosAtualizados.CD) {
      const cdAtualizado = dadosAtualizados.CD;
      Object.assign(itemAtual, cdAtualizado);
    }

    if (dadosAtualizados.DVD) {
      const dvdAtualizado = dadosAtualizados.DVD;
      Object.assign(itemAtual, dvdAtualizado);
    }

    return acervo[index];
  }

  public excluirItem(id: number) {
    const index = acervo.findIndex((item) => item.id === id);
    if (index === -1 || this.temEmprestimosAtivos(acervo[index])) {
      const mensagem =
        index === -1
          ? "Item não encontrado"
          : "O item que deseja excluir possui um empréstimo ativo";
      throw new Error(mensagem);
    }
    acervo.splice(index, 1);
    return acervo;
  }

  public buscarItensDisponiveis(): ItemAcervo[] {
    return acervo.filter((item) => item.verificarDisponibilidade());
  }

  public buscarItensEmprestados(): ItemAcervo[] {
    return acervo.filter((item) => !item.verificarDisponibilidade());
  }

  public listarItens(): ItemAcervo[] {
    return acervo;
  }

  public temEmprestimosAtivos(item: ItemAcervo): boolean {

    return !item.disponivel;
  }
}
