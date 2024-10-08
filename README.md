# Chronos
 Projeto_chronos

### ================ SOBRE O PROJETO =================

 Chronos é o meu primeiro projeto que faço também o backend da aplicação.
 O projeto tem 5 telas principais:
  - Login
  - Home
  - Departamentos
  - Funcionarios
  - Telas de edição

Onde o obejetivo era criar uma interface para gestão de dados com os seguintes objetivos:

Cadastrar os departamentos e colaboradores de uma empresa, podendo atualizar, listar e remover os registros.




### DEPENDÊNCIAS (Frontend)chronos_adm
- @eslint/js@9.10.0
- @types/react-dom@18.3.0
- @types/react@18.3.5
- @vitejs/plugin-react@4.3.1
- @vscode/codicons@0.0.36
- axios@1.7.7
- bootstrap@5.3.3
- eslint@9.10.0
  - eslint-plugin-react-hooks@5.1.0-rc-fb9a90fa48-20240614
  -  eslint-plugin-react-refresh@0.4.12
  -   eslint-plugin-react@7.36.1
- globals@15.9.0
- json-server@1.0.0-beta.2
- react-hook-form@7.53.0
- react-icons@5.3.0
- react-query@3.39.3
- react-router-dom@6.26.2
- styled-components@6.1.13
- sweetalert2@11.14.0
- vite@5.4.5



### DEPENDÊNCIAS Backend (registros_cronos)
- cors@2.8.5
- express@4.21.0
- mysql2@3.11.3
- nodemon@3.1.4

### DB (chronos_database)
O banco foi criado com algumas das informações necessárias para projeto

As tabelas usadas foram `departamentos` e `funcionarios`




#### Configuração

**Frontend**
1. Instale as depêndencias:

   `npm install`

2. Inicie o servidor de desenvolvimento:

   `npm run dev`

===========================

**Backend**
1. Instale as depêndencias:

   `npm install`

2. Inicie o servidor:

   `npm start`

O servidor foi configurado para estar disponível em `http://localhost:9000`




## Documentação dos Endpoints

#### Endpoints do Backend

**GET** /departamentos || /funcionarios

Descrição: Lista todos os registros presentes na tabela.


-------------

**POST** /departamentos || /funcionarios

Descrição: Adiciona um novo registro ou atualiza um registro existente.

-------------

**DELETE** /departamentos  || /funcionarios

Descrição: Remove um registro existente.

Parâmetros: id - ID do departamento a ser removido.






