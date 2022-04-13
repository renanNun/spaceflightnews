import { delay, inject, injectable, registry } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { Article } from "../models/Article";
import ArticlesRepository from "../repositories/ArticlesRepository";
import { IArticlesRepository, ICreateArticle } from "../repositories/IArticlesRepository";


@injectable()
@registry([
    {
        token: "ArticlesRepository",
        // `DelayedConstructor` of Bar will be the token
        useToken: delay(() => ArticlesRepository)
    }
])
export class CreateArticleService {
    constructor(
        @inject('ArticlesRepository')
        private repository: IArticlesRepository,
    ) {}

    public async execute(data: ICreateArticle): Promise<Article> {

        const existingArticle = await this.repository.findByTitleAndUrl(data.title, data.url);
        
        if(existingArticle){
            throw new AppError("Article already exists", 404);
        }

        const newArticle = await this.repository.create({
            title: data.title,
            featured: data.featured,
            url: data.url,
            imageUrl: data.imageUrl,
            newsSite: data.newsSite,
            summary: data.summary,
            publishedAt: data.publishedAt
        });

        return newArticle;

    }
}