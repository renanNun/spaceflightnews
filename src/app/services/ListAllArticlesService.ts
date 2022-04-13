import { Article } from "../models/Article";
import ArticlesRepository from "../repositories/ArticlesRepository";

export class ListAllArticlesService {

    private readonly repository: ArticlesRepository;

    constructor(){
        this.repository = new ArticlesRepository();
    }

    public async execute(page: number = 1, limit: number = 100): Promise<Article[]> {
        
        const articles = await this.repository.findAll(page, limit);

        return articles;

    }

}