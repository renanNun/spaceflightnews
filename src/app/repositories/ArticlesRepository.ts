import { getRepository, Repository } from "typeorm";
import { AppError } from "../../errors/AppError";
import { Article } from "../models/Article";
import { IArticlesRepository, ICreateArticle } from "./IArticlesRepository";


export default class ArticlesRepository implements IArticlesRepository {

    private ormRepository: Repository<Article>;

    constructor(){
        this.ormRepository = getRepository(Article);
    }

    public async findAll(page: number, limit: number): Promise<Article[]> {

        const articles = await this.ormRepository.createQueryBuilder("article")
                                            //.leftJoinAndSelect("article.lauch", "lauchs")
                                            .take(limit)
                                            .skip((page - 1) * limit)
                                            .getMany();

        return articles;

    }

    public async  create(data: ICreateArticle): Promise<Article> {
        
        // Verificando se já existe o artigo cadastrado
        const existingArticle = await this.ormRepository.findOne({
            where: {
                title: data.title,
                url: data.url,
            }
        });

        if(existingArticle){
            throw new AppError("Article already exists", 404);
        }

        const article = this.ormRepository.create({
            title: data.title,
            featured: data.featured || false,
            url: data.url,
            imageUrl: data.imageUrl,
            newsSite: data.newsSite,
            summary: data.summary,
            publishedAt: data.publishedAt,
        });

        await this.ormRepository.save(article);

        return article;


    }

    public async findById(id: number): Promise<Article | undefined> {
        
        const article = await this.ormRepository.findOne(id);
        
        return article;
    }
}