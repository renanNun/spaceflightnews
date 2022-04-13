import { Request, Response } from "express";
import { container } from 'tsyringe';
import { ShowArticlesService } from "../services/ShowArticleService";

export class ShowArticlesController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const showArticle = container.resolve(ShowArticlesService);

        const article = await showArticle.execute(id);

        return response.status(200).json({
            data: article
        });

    }
}