import "reflect-metadata";
import { container } from "tsyringe";
import { createConnection } from "typeorm";
import { ConsumerService } from "../app/services/ConsumerService";
import { CreateArticleService } from "../app/services/CreateArticleService";

const run = async () => {
    // Criando Conexão com o banco de dados
    console.log("Criando Conexão com o banco de dados");
    const connection = await createConnection();

    if(connection.isConnected) {
        console.log("Conectado com sucesso!");
    }else{
        console.log("Falha ao conectar!");
    }

    // Criando uma nova instância do Consumer Service
    const consumerService = new ConsumerService();  

    // Obtendo o número de artigos
    const total = await consumerService.getCount();
    console.log(`Total de artigos: ${total}`);

    // Criar Artigo
    const createArticleService = await container.resolve(CreateArticleService);

    for(let i = 0; i < total; i++) {

        const data = await consumerService.getArticles(i + 1, 100);

        await data.forEach(async (article: any) => {
            try {
                await createArticleService.execute(article);
                console.log(`Artigo ${article.title} criado com sucesso!`);   
            } catch (error: any) {
                console.log(error.message);
            }
                    
        });
    }

    console.log("Artigos criados com sucesso!");
    //console.log(data);


    // Fechando a conexão com o banco de dados
    //await connection.close();

}

run();