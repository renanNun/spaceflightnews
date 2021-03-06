import { delay, inject, injectable, registry } from "tsyringe";
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
export class ListAllArticlesService {

    constructor(
        @inject('ArticlesRepository')
        private repository: IArticlesRepository,
    ) {}

    public async execute(page: number = 1, limit: number = 100): Promise<Article[]> {
        
        const articles = await this.repository.findAll(page, limit);

        return articles;

    }

}