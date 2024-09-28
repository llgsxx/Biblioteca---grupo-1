# Biblioteca---grupo-1

Estrutura do Projeto
Configuração do Ambiente

Classe Abstrata: ItemAcervo

Propriedades comuns a todos os itens, como titulo, autor, anoPublicacao, etc.
Métodos para manipular itens (ex: verificar disponibilidade).


Superclasses Intermediárias:

Publicacao (para livros e revistas):
Propriedades específicas, como isbn, editora, numeroEdicao, etc.

Midia (para CDs e DVDs):
Propriedades como duracao, tipo, etc.

Classes Concretas:
Livro: Extende Publicacao.
Revista: Extende Publicacao.
CD: Extende Midia.
DVD: Extende Midia.
Classe Biblioteca

Métodos para gerenciar o acervo: adicionar, editar, remover e consultar itens.
Interface: Localizavel

Defina métodos para obter a localização física dos itens (ex: getLocalizacao).
Função Genérica: registrarItem

Uma função que aceita qualquer tipo de ItemAcervo e a adiciona à biblioteca, garantindo a tipagem correta.
Lógica de Negócio

Implemente a validação de disponibilidade de itens:
Verifique se o item está disponível antes de permitir um empréstimo.
Controle os empréstimos, evitando que um item com empréstimo ativo seja removido.
Funcionalidades Detalhadas
Gerenciamento do Acervo

Cadastro de Itens:
Formulários para entrada de dados.
Crie uma função que recebe os dados e instância o tipo de item correto.

Edição de Itens:
Listagem dos itens com opção de edição.
Formulário pré-preenchido para facilitar a edição.

Remoção de Itens:
Verifique a disponibilidade do item antes de removê-lo.
Controle de Disponibilidade

Crie uma propriedade disponivel em ItemAcervo.
Atualize essa propriedade quando um item for emprestado ou devolvido.