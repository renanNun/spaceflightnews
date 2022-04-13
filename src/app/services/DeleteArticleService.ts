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
export class DeleteArticlesService {

    constructor(
        @inject('ArticlesRepository')
        private repository: IArticlesRepository,
    ) {}

    public async execute(id: number): Promise<void> {
        
        const article = await this.repository.findById(id);

        if(!article)
        {
            throw new AppError("Article not found");
        }

        await this.repository.delete(id);

    }

}