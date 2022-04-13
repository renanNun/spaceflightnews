import { getRepository, Repository } from "typeorm";
import { Article } from "../models/Article";

interface ICreateArticle{}
interface IUpdateArticle{}

interface IArticlesRepository {
    // findByTitle(title: string): Promise<Article | undefined>;
    // findById(id: number): Promise<Article | undefined>;
    findAll(page: number, limit: number): Promise<Article[]>;
    // create(data: ICreateArticle): Promise<Article>;
    // update(id: number, data: IUpdateArticle): Promise<Article>;
    // delete(id: number): Promise<void>;
}

export default class ArticlesRepository implements IArticlesRepository {

    private ormRepository: Repository<Article>;

    constructor(){
        this.ormRepository = getRepository(Article);
    }

    public async findAll(page: number, limit: number): Promise<Article[]> {

        const articles = await this.ormRepository.createQueryBuilder("article")
                                            .leftJoinAndSelect("article.launchs", "launch")
                                            .leftJoinAndSelect("article.events", "event")
                                            .orderBy("article.id", "DESC")
                                            .skip(page * limit)
                                            .take(limit)
                                            .getMany();

        return articles;

    }
}