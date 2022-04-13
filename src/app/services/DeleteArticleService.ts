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
export class DeleteArticlesService {

    constructor(
        @inject('ArticlesRepository')
        private repository: IArticlesRepository,
    ) {}

    public async execute(id: number): Promise<void> {
        
        await this.repository.delete(id);

    }

}