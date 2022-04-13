import { Request, Response } from "express";
import { container } from 'tsyringe';
import { DeleteArticlesService } from "../services/DeleteArticleService";

export class DeleteArticlesController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const deleteArticle = container.resolve(DeleteArticlesService);

        await deleteArticle.execute(Number(id));

        return response.status(204).json({
            message: "Article deleted"
        });

    }
}