import prompt from "readline-sync";
import {
  FuncionalidadesAdmin,
  FuncionalidadesUser,
} from "./helpers/funcionalidades";
import { delay } from "./helpers/loading";
import { BibliotecaService } from "./services/BibliotecaService";
import { tiposDecadastros } from "./helpers/tiposDeCadastros";
import { props } from "./types";

let continuarAdmin = true;
let continuarUser = true;
const bibliotecaService = new BibliotecaService();

function exibirMenuAdmin() {
  console.log(`
========================
Escolha uma opção:
  1. Adicionar um item
  2. Atualizar um item
  3. Remover item
  4. Listar itens disponiveis para emprestimos
  5. Listar itens emprestados
  6. Logout
========================
`);
}

function exibirMenuLogin() {
  console.log(`
========================
Escolha uma opção:
  1. Acessar como Admin
  2. Acessar como usuário
========================
`);
}

function exibirMenuUsuario() {
  console.log(`
========================
Escolha uma opção:
  7. Emprestar livro
  8. Devolver livro
  9. Logout
========================
`);
}

function exibirMenuDeCadastroDeItem() {
  console.log(`
========================
Qual item deseja cadastrar? 
  1. Livro
  2. Revista
  3. CD
  4. DVD
========================
    `);
}

function digiteOpcao() {
  let opcao = prompt.questionInt("Digite qual opcao voce deseja executar: ");
  return opcao;
}

function digiteOIdQueDesejaAtualizar() {
  let id = prompt.questionInt("Digite o id do item que deseja atualizar: ");
  return id;
}

function digiteOIdQueDesejaExcluir() {
  let id = prompt.questionInt("Digite o id do item que deseja excluir: ");
  return id;
}

function digiteOIdDoItemQueDesejaEmprestar() {
  let id = prompt.questionInt("Digite o id do item que deseja emprestar: ");
  return id;
}

function digiteOIdDoItemQueDesejaDevolver() {
  let id = prompt.questionInt("Digite o id do item que deseja devolver: ");
  return id;
}

function opcaoLivro() {
  return {
    isbn: prompt.question("Digite o ISBN do livro: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "ISBN invalido. Deve ter entre 1 e 10 digitos.",
    }),
    titulo: prompt.question("Digite o titulo do livro: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "O titulo nao pode ser vazio.",
    }),
    autor: prompt.question("Digite o nome do autor: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "O nome do autor nao pode ser vazio.",
    }),
    anoPublicacao: solicitarAnoDePublicacao(),
    numeroPaginas: prompt.questionInt("Quantas paginas possui? ", {
      min: 1,
      limitMessage: "Numero de paginas invalido. Deve ser maior que zero.",
    }),
  };
}

function solicitarAnoDePublicacao() {
  let ano = prompt.questionInt("Qual o ano de publicacao? ", {
    limit: (input: string) => input.trim() !== "",
    limitMessage: "Ano é obrigatorio",
  });

  if( ano < 1900 || ano > new Date().getFullYear()) {
    throw new Error("Ano invalido");
  }

  return ano;
}

function opcaoRevista() {
  return {
    titulo: prompt.question("Digite o titulo da revista: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "O titulo nao pode ser vazio.",
    }),
    autor: prompt.question("Digite o nome do autor: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "O nome do autor nao pode ser vazio.",
    }),
    anoPublicacao: solicitarAnoDePublicacao(),
    edicao: prompt.question("Digite a ediçao da revista: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "A edicao nao pode ser vazio.",
    }),
    editora: prompt.question("Digite o nome da editora da revista: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "O nome da editora da revista nao pode ser vazio.",
    }),
  };
}

function opcaoCD() {
  return {
    titulo: prompt.question("Digite o titulo do CD: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "O titulo nao pode ser vazio.",
    }),
    duracao: prompt.questionInt("Digite a duracao em minutos: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "A duracao nao pode ser vazio.",
    }),
    formato: prompt.question("Qual o formato? ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "O formato nao pode ser vazio.",
    }),
    artista: prompt.question("Digite o nome do(a) artista: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "O nome do(a) artista nao pode ser vazio.",
    }),
    numeroFaixas: prompt.questionInt(
      "Digite o numero de faixas que contem no CD: ",
      {
        limit: (input: string) => input.trim() !== "",
        limitMessage: "O numero de faixa nao pode ser vazio.",
      }
    ),
  };
}

function opcaoDVD() {
  return {
    titulo: prompt.question("Digite o titulo do DVD: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "O titulo nao pode ser vazio.",
    }),
    duracao: prompt.questionFloat("Digite a duracao do DVD: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "A duracao nao pode ser vazia.",
    }),
    formato: prompt.question("Qual o formato do DVD? ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "O formato do DVD nao pode ser vazio.",
    }),
    resolucao: prompt.question("Qual é a resolucao? ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "A resolucao nao pode ser vazio.",
    }),
    regiao: prompt.question("Digite a regiao onde foi produzido o DVD: ", {
      limit: (input: string) => input.trim() !== "",
      limitMessage: "A regiao nao pode ser vazio.",
    }),
  };
}

function solicitarDados(opcao: number) {
  if (!validarOpcao(opcao)) {
    throw new Error(`A Opção ${opcao} é inválida`);
  }

  return retornarProps(opcao);
}

function retornarProps(opcao: number) {
  let props: props = {
    LIVRO: undefined,
    REVISTA: undefined,
    CD: undefined,
    DVD: undefined,
  };

  switch (opcao) {
    case tiposDecadastros.LIVRO:
      props = { ...props, LIVRO: opcaoLivro() };
      break;

    case tiposDecadastros.REVISTA:
      props = { ...props, REVISTA: opcaoRevista() };
      break;

    case tiposDecadastros.CD:
      props = { ...props, CD: opcaoCD() };
      break;

    case tiposDecadastros.DVD:
      props = { ...props, DVD: opcaoDVD() };
      break;
    default:
      console.error("opcao passada a funcao retornarProps, é invalida");
      break;
  }

  return props;
}

function validarOpcao(opcao: number) {
  return opcao >= tiposDecadastros.LIVRO && opcao <= tiposDecadastros.DVD;
}

async function executar() {
  exibirMenuLogin();

  let tipoDeAcesso = digiteOpcao();

  if (tipoDeAcesso == 1) {
    executarModoAdmin();
  } else if (tipoDeAcesso == 2) {
    executarModoUsuario();
  } else {
    console.log("opcao invalida");
    executar();
  }
}

async function executarModoAdmin() {
  try {
    continuarAdmin = true;
    while (continuarAdmin) {
      exibirMenuAdmin();

      let opcao = digiteOpcao();

      switch (opcao) {
        case FuncionalidadesAdmin.CADASTRAR_ITEM:
          exibirMenuDeCadastroDeItem();

          const opcaoCadastro = digiteOpcao();

          const result = bibliotecaService.cadastrarItem(
            opcaoCadastro,
            solicitarDados(opcaoCadastro)
          );

          console.info(`Item cadastrado com sucesso`);
          console.log(result);

          break;

        case FuncionalidadesAdmin.ATUALIZAR_ITEM:
          console.log(bibliotecaService.listarItensCadastrados());
          const id = digiteOIdQueDesejaAtualizar();
          const item = bibliotecaService.identificarItem(id);
          const propsItem = solicitarDados(item);
          const status = bibliotecaService.atualizarItem(id, propsItem);

          if (!status) {
            throw Error("Erro ao atualizar item");
          }
          console.log("Item atualizado com sucesso!");

          break;

        case FuncionalidadesAdmin.DELETAR_ITEM:
          console.log(bibliotecaService.listarItensCadastrados());
          const idExclusao = digiteOIdQueDesejaExcluir();
          const excluido = bibliotecaService.deletarItem(idExclusao);
          if (!excluido) {
            throw new Error("Erro ao excluir item");
          }
          console.info("Item excluido com sucesso!");

          break;

        case FuncionalidadesAdmin.BUSCAR_ITENS_DISPONIVEIS:
          console.log("ITENS DISPONIVEIS");
          console.log(bibliotecaService.listarItensDisponiveis());
          break;

        case FuncionalidadesAdmin.BUSCAR_ITENS_EMPRESTADOS:
          console.log("ITENS EMPRESTADOS");
          console.log(bibliotecaService.listarItensEmprestados());
          break;

        case FuncionalidadesAdmin.ACESSAR_COMO_USUARIO:
          continuarAdmin = false;
          executar();
          break;
        default:
          console.log("Opcao invalida! Tente novamente.\n");
      }

      await delay(3000);
    }
  } catch (error) {
    console.error("Error: " + error);
  }
}

async function executarModoUsuario() {
  try {
    continuarUser = true;
    while (continuarUser) {
      exibirMenuUsuario();

      let opcao = digiteOpcao();

      switch (opcao) {
        case FuncionalidadesUser.EMPRESTAR_LIVRO:
          console.log("ITENS DISPONIVEIS");
          const listaDisponivel = bibliotecaService.listarItensDisponiveis();
          console.log(listaDisponivel);

          if (listaDisponivel.length == 0) {
            console.log("Não possui item disponivel para emprestimo");
            break;
          }

          const idEmprestimo = digiteOIdDoItemQueDesejaEmprestar();
          const emprestado = bibliotecaService.emprestarItem(idEmprestimo);

          if (!emprestado) {
            throw new Error("Erro ao emprestar Item");
          }

          console.info("Item emprestado com sucesso!");

          const listaDeEmprestimo = bibliotecaService.listarEmprestimos();

          console.log("LISTA DE EMPRESTIMO");
          console.log(listaDeEmprestimo);

          break;

        case FuncionalidadesUser.DEVOLVER_LIVRO:
          console.log("ITENS EMPRESTADOS");
          const listaEmprestado = bibliotecaService.listarEmprestimos();
          console.log(listaEmprestado);

          const idDevolucao = digiteOIdDoItemQueDesejaDevolver();
          const statusDevolucao = bibliotecaService.devolverItem(idDevolucao);

          if (!statusDevolucao) {
            throw new Error("Erro ao devolver Item");
          }

          console.info("Item devolvido com sucesso!");

          const listaDeItemEmprestado = bibliotecaService.listarEmprestimos();

          console.log("LISTA DE EMPRESTIMO");
          console.log(listaDeItemEmprestado);

          break;

        case FuncionalidadesUser.ACESSAR_COMO_ADMIN:
          continuarUser = false;
          executar();
          break;

        default:
          console.log("Opção inválida! Tente novamente.\n");
      }
      await delay(3000);
    }
  } catch (error) {
    console.error("Error: " + error);
  }
}

try {
  executar();
} catch (erro) {
  console.error("Error: " + erro);
}
