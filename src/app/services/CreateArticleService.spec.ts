import { AppError } from "../../errors/AppError";
import FakeArticlesRepository from "../repositories/fakes/FakeArticlesRepository";
import { CreateArticleService } from "./CreateArticleService";

describe('CreateArticleService', () => {

    let service: FakeArticlesRepository;
    let createArticleService: CreateArticleService;

    beforeAll(() => {
        service = new FakeArticlesRepository();
        createArticleService = new CreateArticleService(service);
    });

    it('should be created', async () => {
        
        const article = await createArticleService.execute({
            title: "Teste",
            featured: false,
            url: "teste",
            imageUrl: "teste",
            newsSite: "teste",
            summary: "teste",
            publishedAt: "teste"
        });

        expect(article).toHaveProperty('id');
    });

    it('should not be created', async () => {
        await expect(createArticleService.execute({
            title: "Teste",
            featured: false,
            url: "teste",
            imageUrl: "teste",
            newsSite: "teste",
            summary: "teste",
            publishedAt: "teste"
        })).rejects.toBeInstanceOf(AppError);
    });
    
});


