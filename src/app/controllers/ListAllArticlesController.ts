import { Request, Response } from "express";
import { container } from 'tsyringe';
import { ListAllArticlesService } from "../services/ListAllArticlesService";

export class ListAllArticlesController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const { page, limit } = request.query;

        const listAllArticles = container.resolve(ListAllArticlesService);

        const articles = await listAllArticles.execute(page ? Number(page) : 1,limit ? Number(limit) : 100);

        return response.status(200).json({
            data: articles
        });

    }
}