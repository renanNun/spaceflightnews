# Back-end Challenge 🏅 2021 - Space Flight News

Este é um desafio para avaliação das capacidades de desenvolvimento Back-end Developer, o objetivo deste projeto é criar uma API Rest que utilizará os dados do projeto 
[Space Flight News](https://api.spaceflightnewsapi.net/v3/documentation), uma api pública com informações sobre voos espaciais.

* Acessando o projeto: localhost:3333/

## Tecnologiais Utilizadas

* Nodejs
* Postgresql
* Docker

## Instalação do Projeto

### Sem utilização do Docker

* Passo 1:

Crie o Banco de dados postgresql em sua máquina e altera os parâmetros de 
username, password e host no arquivo ormconfig.json.

* Passo 2:

instale as dependências do projeto:

```
npm install
```

* Passo 3:

crie as tabelas no banco com o comando da migration

```
npm run typeorm migration:run
```

*  Passo 4:

suba o servidor

``` 
npm run dev
```

* Script de seed

```
npm run seed
```

### Utilizando o docker

* Crie o ambiente docker

```
docker-compose up -d
```

* Script de seed

```
docker exec -it app npm run seed
```

-------
aviso sobre erros de construção do container: Podem ocorrer erros na execução da construção do app devido a substituição de lf para crlf
causada pelo windows, altere o tipo de endpoint dos arquivos Dockerfile e do script para que o erro não ocorra mais;


### ToDo

 - Obrigatório 1:
* [x] [GET]/:  Retornar um Status: 200 e uma Mensagem "Back-end Challenge 2021 🏅 - Space Flight News"
* [x] [GET]/articles/:   Listar todos os artigos da base de dados, utilizar o sistema de paginação para não sobrecarregar a REQUEST
* [x] [GET]/articles/{id}: Obter a informação somente de um artigo
* [x] [POST]/articles/: Adicionar um novo artigo

* [x] [PUT]/articles/{id}: Atualizar um artigo baseado no id
* [x] [DELETE]/articles/{id}: Remover um artigo baseado no id

- Obrigatório 2:
* [x] Para alimentar o seu banco de dados você deve criar um script para armazenar os dados de todos os artigos na Space Flight News API.

- Obrigatório 3:
* [x] Além disso você precisa desenvolver um CRON para ser executado diariamente às 9h e armazenar em seu os novos artigos ao seu banco de dados. (Para essa tarefa você poderá alterar o seu modelo de dados)

- Diferencial 1:
* [x] Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;

- Diferencial 2:
* [x] Configurar um sistema de alerta se houver algum falha durante a sincronização dos artigos;

- Diferencial 3:
* [ ] Descrever a documentação da API utilizando o conceito de Open API 3.0;

- Diferencial 4:
* [x]  Escrever Unit Tests para os endpoints da API;

-----------
This is a challenge by [Coodesh](https://coodesh.com).
