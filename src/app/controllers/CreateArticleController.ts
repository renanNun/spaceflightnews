import { Request, Response } from "express";
import { container } from 'tsyringe';
import { CreateArticleService } from "../services/CreateArticleService";

export class CreateArticleController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const { 
            title, 
            featured, 
            url, 
            imageUrl, 
            newsSite, 
            summary, 
            publishedAt
        } = request.body;

        const listAllProducts = container.resolve(CreateArticleService);

        const article = await listAllProducts.execute({
            title, 
            featured,
            url, 
            imageUrl, 
            newsSite, 
            summary, 
            publishedAt
        });

        return response.status(201).json({
            data: article
        });

    }
}