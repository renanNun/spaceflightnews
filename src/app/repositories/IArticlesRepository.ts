import { Article } from "../models/Article";

export interface ICreateArticle{
    title: string;
    featured?: boolean;
    url: string;
    imageUrl: string;
    newsSite: string;
    summary: string;
    publishedAt: string;
}

export interface IUpdateArticle{
    title?: string;
    featured?: boolean;
    url?: string;
    imageUrl?: string;
    newsSite?: string;
    summary?: string;
    publishedAt?: string;
}

export interface IArticlesRepository {
    // findByTitle(title: string): Promise<Article | undefined>;
    findById(id: number): Promise<Article | undefined>;
    findAll(page: number, limit: number): Promise<Article[]>;
    create(data: ICreateArticle): Promise<Article>;
    update(id: number, data: IUpdateArticle): Promise<Article>;
    delete(id: number): Promise<void>;
}