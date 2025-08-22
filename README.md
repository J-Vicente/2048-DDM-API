# API de Usuários e Recordes

Esta é uma API RESTful desenvolvida em Node.js utilizando Express, Sequelize e SQLite. Ela permite o cadastro, autenticação e gerenciamento de usuários, além do registro e consulta de recordes. O objetivo desta API é servir como backend do Projeto final da matéria Desenvolvimento de Dispositivos Móveis do curso de Análise e Desenvolvimento de Sistemas, ministrada pelo professor Jeferson Queiroga.

## Funcionalidades

- Cadastro de usuários com validação de senha
- Autenticação via JWT
- Registro de novos recordes
- Consulta de recordes 
- Banco de dados SQLite integrado via Sequelize


## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/J-Vicente/2048-DDM-API.git
   cd API
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Configure o arquivo `.env`:
   ```
   JWT_SECRET = chave_secreta
   ```

4. Inicie o servidor:
   ```sh
   npm start
   ```

## Endpoints

### Usuários

- `POST /api/user/registration`  
  Cadastro de novo usuário

- `POST /api/user/login`  
  Autenticação e geração de token JWT


### Recordes

- `POST /api/records/newRecord`  
  Cadastro de novo recorde

- `GET /api/records/`  
  Listagem de recordes


