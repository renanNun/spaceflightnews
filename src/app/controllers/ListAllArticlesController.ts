import { Request, Response } from "express";
import { ListAllArticlesService } from "../services/ListAllArticlesService";

export class ListAllArticlesController {
    private readonly service: ListAllArticlesService;

    constructor() {
        this.service = new ListAllArticlesService();
    }

    public async handle(request: Request, response: Response): Promise<Response> {

        const { page, limit } = request.query;

        const articles = await this.service.execute(Number(page), Number(limit));

        return response.status(200).json({
            data: articles
        });

    }
}