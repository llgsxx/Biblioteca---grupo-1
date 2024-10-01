import { tiposDecadastros } from "../helpers/tiposDeCadastros";
import { Emprestimo } from "../models/Emprestimo";
import {
  Biblioteca,
  Livro,
  Revista,
  CD,
  DVD,
  ItemAcervo,
} from "../models/index";
import { props } from "../types";
import { gerarProximaLocalizacao } from "./localizacaoService";

export class BibliotecaService {
  private biblioteca: Biblioteca;
  private emprestimos: Emprestimo[] = [];

  constructor() {
    this.biblioteca = new Biblioteca();
  }

  public cadastrarItem(tipo: number, dados: props) {
    switch (tipo) {
      case tiposDecadastros.LIVRO:
        if (!dados.LIVRO) {
          throw new Error("Propriedades invalidas");
        }

        const livro = new Livro({
          id: this.gerarId(),
          isbn: dados.LIVRO.isbn,
          titulo: dados.LIVRO.titulo,
          autor: dados.LIVRO.autor,
          anoPublicacao: dados.LIVRO.anoPublicacao,
          numeroPaginas: dados.LIVRO.numeroPaginas,
          disponivel: true,
          localizacao: gerarProximaLocalizacao("L"),
        });

        this.biblioteca.registrarItem(livro);
        return livro;
        break;
      case tiposDecadastros.REVISTA:
        if (!dados.REVISTA) {
          throw new Error("Propriedades invalidas");
        }

        const revista = new Revista({
          id: this.gerarId(),
          titulo: dados.REVISTA.titulo,
          autor: dados.REVISTA.autor,
          anoPublicacao: dados.REVISTA.anoPublicacao,
          edicao: dados.REVISTA.edicao,
          editora: dados.REVISTA.editora,
          disponivel: true,
          localizacao: gerarProximaLocalizacao("R"),
        });

        this.biblioteca.registrarItem(revista);
        return revista;
        break;
      case tiposDecadastros.CD:
        if (!dados.CD) {
          throw new Error("Propriedades invalidas");
        }

        const cd = new CD({
          id: this.gerarId(),
          titulo: dados.CD.titulo,
          artista: dados.CD.artista,
          duracao: dados.CD.duracao,
          formato: dados.CD.formato,
          numeroFaixas: dados.CD.numeroFaixas,
          disponivel: true,
          localizacao: gerarProximaLocalizacao("C"),
        });

        this.biblioteca.registrarItem(cd);
        return cd;
        break;
      case tiposDecadastros.DVD:
        if (!dados.DVD) {
          throw new Error("Propriedades invalidas");
        }

        const dvd = new DVD({
          id: this.gerarId(),
          titulo: dados.DVD.titulo,
          disponivel: true,
          localizacao: gerarProximaLocalizacao("D"),
          duracao: dados.DVD.duracao,
          formato: dados.DVD.formato,
          regiao: dados.DVD.regiao,
          resolucao: dados.DVD.resolucao,
        });

        this.biblioteca.registrarItem(dvd);
        return dvd;
        break;
      default:
        throw new Error("Tipo de item inválido");
        break;
    }
  }

  public atualizarItem(id: number, dados: props) {
    return this.biblioteca.atualizarItem(id, dados);
  }

  public identificarItem(id: number) {
    const item = this.biblioteca.obterItemPorId(id);

    if (!item) throw new Error("Item não localizado.");

    return this.qualOTipoDoItem(item.localizacao.estante);
  }

  public deletarItem(id: number) {
    return this.biblioteca.excluirItem(id);
  }

  public listarItensDisponiveis(): ItemAcervo[] {
    return this.biblioteca.buscarItensDisponiveis();
  }

  public listarItensEmprestados(): ItemAcervo[] {
    return this.biblioteca.buscarItensEmprestados();
  }

  private gerarId() {
    return Date.now();
  }

  public listarItensCadastrados() {
    return this.biblioteca.listarItens();
  }

  private qualOTipoDoItem(tipo: string) {
    let letra = tipo.charAt(0);

    if (letra == "L") return 1;
    if (letra == "R") return 2;
    if (letra == "C") return 3;
    if (letra == "D") return 4;

    return 0;
  }

  public emprestarItem(id: number): boolean {
    const item = this.biblioteca.obterItemPorId(id);

    if (item && item.disponivel) {
      const emprestimo = new Emprestimo(item);
      item.disponivel = false;
      this.emprestimos.push(emprestimo);
      return true;
    }

    return false;
  }

  public listarEmprestimos(): Emprestimo[] {
    return this.emprestimos;
  }

  public devolverItem(id: number): boolean {
    const index = this.emprestimos.findIndex(
      (emp) => emp.item.id === id && emp.dataDevolucao === null
    );

    if (index !== -1) {
      this.emprestimos[index].devolver();

      this.emprestimos.splice(index, 1);

      return true;
    }

    return false;
  }
}
