import { Article } from "../../models/Article";
import { IArticlesRepository, ICreateArticle } from "../IArticlesRepository";


export default class FakeArticlesRepository implements IArticlesRepository {

    private articles: Article[] = [];

    public async findAll(page: number, limit: number): Promise<Article[]> {
        return this.articles;
    }

    public async  create(data: ICreateArticle): Promise<Article> {

        const article = new Article();

        article.id = this.articles.length + 1;

        article.title = data.title;
        article.featured = data.featured || false;
        article.url = data.url;
        article.imageUrl = data.imageUrl;
        article.newsSite = data.newsSite;
        article.summary = data.summary;
        article.publishedAt = data.publishedAt;

        this.articles.push(article);

        return article;
    }

    public async findById(id: number): Promise<Article | undefined> {
        const article = this.articles.find(article => article.id === id);

        return article;
    }

    public async findByTitleAndUrl(title: string, url: string): Promise<Article | undefined>
    {
        return this.articles[0];
    }

    public async update(id: number, data: ICreateArticle): Promise<Article> {
        const article = this.articles.find(article => article.id === id);

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

        return article;
    }

    public async delete(id: number): Promise<void> {
        this.articles = this.articles.filter(article => article.id !== id);
    }
}