import "reflect-metadata";
import { container } from "tsyringe";
import { createConnection, getRepository } from "typeorm";
import { CronJob } from "../app/models/CronJob";
import { ConsumerService } from "../app/services/ConsumerService";
import { CreateArticleService } from "../app/services/CreateArticleService";

// Cria um registro na tabela cron_job

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
    const data = await consumerService.getArticles(1, total);

    for(let i = 0; i < total; i++) {

        try {
            await createArticleService.execute(data[i]);
            console.log(`Artigo ${i}: ${data[i].title} criado com sucesso!`);   
        } catch (error: any) {
            console.log(error.message);
        }     
    }

    console.log("Artigos criados com sucesso!");
    //console.log(data);

    let cronJobrepository = getRepository(CronJob);

    let cronJob = new CronJob();
    cronJob.quantity = total;

    await cronJobrepository.save(cronJob);

    // Fechando a conexão com o banco de dados
    //await connection.close();

}

run();