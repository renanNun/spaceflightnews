import { delay, inject, injectable, registry } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { Article } from "../models/Article";
import ArticlesRepository from "../repositories/ArticlesRepository";
import { IArticlesRepository, ICreateArticle, IUpdateArticle } from "../repositories/IArticlesRepository";


@injectable()
@registry([
    {
        token: "ArticlesRepository",
        // `DelayedConstructor` of Bar will be the token
        useToken: delay(() => ArticlesRepository)
    }
])
export class UpdateArticleService {
    constructor(
        @inject('ArticlesRepository')
        private repository: IArticlesRepository,
    ) {}

    public async execute(id: number, data: IUpdateArticle): Promise<Article> {

        const existingArticle = await this.repository.findById(id);

        if(!existingArticle){
            throw new AppError("Article not found", 404);
        }

        const article = await this.repository.update(id,{
            title: data.title,
            featured: data.featured,
            url: data.url,
            imageUrl: data.imageUrl,
            newsSite: data.newsSite,
            summary: data.summary,
            publishedAt: data.publishedAt
        });

        return article;

    }
}