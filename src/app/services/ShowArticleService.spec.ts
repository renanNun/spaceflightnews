import { AppError } from "../../errors/AppError";
import FakeArticlesRepository from "../repositories/fakes/FakeArticlesRepository";
import { CreateArticleService } from "./CreateArticleService";
import { ShowArticlesService } from "./ShowArticleService";

describe('ShowArticleService', () => {
    let articlesRepository: FakeArticlesRepository;
    let service: ShowArticlesService;
    let createArticleService: CreateArticleService;

    beforeAll(() => {
        articlesRepository = new FakeArticlesRepository();
        service = new ShowArticlesService(articlesRepository);

        createArticleService = new CreateArticleService(articlesRepository);
    });

    it('should be return id equal 1', async () => {
        await createArticleService.execute({
            title: "Teste",
            featured: false,
            url: "teste",
            imageUrl: "teste",
            newsSite: "teste",
            summary: "teste",
            publishedAt: "teste"
        });

        const article = await service.execute(1);

        expect(article.id).toBe(1);
    });

    it('should be return error if article not found', async () => {
        await expect(service.execute(3)).rejects.toBeInstanceOf(AppError);
    });

});