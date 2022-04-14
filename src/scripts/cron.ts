import cron from 'node-cron';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import { CronJob } from '../app/models/CronJob';
import { ConsumerService } from '../app/services/ConsumerService';
import { CreateArticleService } from '../app/services/CreateArticleService';

const cronScript = async () => {
    cron.schedule("0 9 * * *", async () => {
        console.log("running a task every day at 9:00");

        const consumerService = new ConsumerService();

        const total = await consumerService.getCount();
        console.log(`Total de artigos: ${total}`);

        // Ultimo artigo criado através do cron
        const cronJobrepository = getRepository(CronJob);
        const cronJob = await cronJobrepository.findOne({ order: { id: "DESC" } });

        const createArticleService = await container.resolve(CreateArticleService);

        const data = await consumerService.getArticles(1, total);
        let pos = cronJob?.quantity || 0;
        for(let i = pos; i < total; i++) {

            try {
                await createArticleService.execute(data[i]);
                console.log(`Artigo ${i}: ${data[i].title} criado com sucesso!`);   
            } catch (error: any) {
                console.log(error.message);
            }      

            pos = i;
        }

        
        let newCronJob = new CronJob();
        newCronJob.quantity = pos;

        await cronJobrepository.save(newCronJob);

    }, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
    });
}

export default cronScript;