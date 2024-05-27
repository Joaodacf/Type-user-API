Projeto de Gerenciamento de Usuários
Este projeto é uma aplicação de backend construída com Node.js e TypeScript. Ele fornece uma API RESTful para gerenciar usuários em um sistema. As operações de CRUD (Create, Read, Update, Delete) são suportadas.

Funcionalidades
createUser
Esta função é responsável por criar um novo usuário. Ela recebe um objeto contendo as informações do usuário (nome, email e senha) e retorna uma mensagem de sucesso se o usuário for criado com sucesso. Se ocorrer um erro durante a criação do usuário, uma mensagem de erro é retornada.

Atualizar Usuário
A função AtualizarUsuario permite atualizar as informações de um usuário existente. Ela recebe um ID de usuário e um objeto contendo as novas informações do usuário (nome, email e senha). Se a operação for bem-sucedida, ela retorna uma mensagem de sucesso. Caso contrário, ela retorna uma mensagem de erro.

Login de Usuário
A função loginUsuario permite que um usuário faça login no sistema. Ela recebe um email e uma senha, e retorna as informações do usuário se o login for bem-sucedido. Caso contrário, ela retorna uma mensagem de erro.

DeletarUsuario
Esta função é responsável por deletar um usuário. Ela recebe um ID de usuário e retorna uma mensagem de sucesso se o usuário for deletado com sucesso. Se ocorrer um erro durante a exclusão do usuário, uma mensagem de erro é retornada.

ListarUsuario
Esta função é responsável por buscar um usuário pelo seu ID. Ela recebe um ID de usuário e retorna as informações do usuário se ele for encontrado. Se ocorrer um erro durante a busca do usuário, uma mensagem de erro é retornada.

Como usar
Para usar este projeto, você precisa ter Node.js e npm instalados em seu sistema. Siga estas etapas:

Clone o repositório.
Navegue até o diretório do projeto e execute npm install para instalar as dependências.
Configure as variáveis de ambiente conforme necessário.
Execute npm start para iniciar o servidor.
Contribuindo
Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de enviar um pull request.
