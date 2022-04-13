import { Request, Response } from "express";
import { container } from 'tsyringe';
import { UpdateArticleService } from "../services/UpdateArticleService";

export class UpdateArticleController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const { 
            title, 
            featured, 
            url, 
            imageUrl, 
            newsSite, 
            summary, 
            publishedAt
        } = request.body;

        const updateArticle = container.resolve(UpdateArticleService);

        const article = await updateArticle.execute(Number(id), {
            title, 
            featured,
            url, 
            imageUrl, 
            newsSite, 
            summary, 
            publishedAt
        });

        return response.status(204).json({
            data: article
        });

    }
}