import { delay, inject, injectable, registry } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { Article } from "../models/Article";
import ArticlesRepository from "../repositories/ArticlesRepository";
import { IArticlesRepository } from "../repositories/IArticlesRepository";

@injectable()
@registry([
    {
      token: "ArticlesRepository",
      // `DelayedConstructor` of Bar will be the token
      useToken: delay(() => ArticlesRepository)
    }
  ])
export class ShowArticlesService {

    constructor(
        @inject('ArticlesRepository')
        private repository: IArticlesRepository,
    ) {}

    public async execute(id: number): Promise<Article> {
        
        const article = await this.repository.findById(id);
        
        if(!article){
            throw new AppError("Article not found", 404);
        }

        return article;

    }

}