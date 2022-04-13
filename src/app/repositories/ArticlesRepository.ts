import { getRepository, Repository } from "typeorm";
import { Article } from "../models/Article";
import { IArticlesRepository, ICreateArticle } from "./IArticlesRepository";


export default class ArticlesRepository implements IArticlesRepository {

    private ormRepository: Repository<Article>;

    constructor(){
        this.ormRepository = getRepository(Article);
    }

    public async findByTitleAndUrl(title: string, url: string): Promise<Article | undefined>
    {
        return this.ormRepository.findOne({
            where: {
                title: title,
                url: url
            }
        });
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

    public async update(id: number, data: ICreateArticle): Promise<Article> {

        const article = await this.ormRepository.findOne(id);

        if(!article)
        {
            throw new Error("Article not found");
        }

        if(data.title){
            article.title = data.title;
        }

        if(data.featured){
            article.featured = data.featured;
        }

        if(data.url){
            article.url = data.url;
        }

        if(data.imageUrl){
            article.imageUrl = data.imageUrl;
        }

        if(data.newsSite){
            article.newsSite = data.newsSite;
        }

        if(data.summary){
            article.summary = data.summary;
        }

        if(data.publishedAt){
            article.publishedAt = data.publishedAt;
        }

        await this.ormRepository.save(article);

        return article;


    }

    public async delete(id: number): Promise<void> {
            
            const article = await this.ormRepository.findOneOrFail(id);
    
            await this.ormRepository.remove(article);
    
        }
}