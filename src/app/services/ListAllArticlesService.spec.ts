import FakeArticlesRepository from "../repositories/fakes/FakeArticlesRepository";
import { CreateArticleService } from "./CreateArticleService";
import { ListAllArticlesService } from "./ListAllArticlesService";

describe('ListAllArticlesService', () => {
    let articlesRepository: FakeArticlesRepository;
    let service: ListAllArticlesService;
    let createArticleService: CreateArticleService;


    beforeAll(() => {
        articlesRepository = new FakeArticlesRepository();
        service = new ListAllArticlesService(articlesRepository);

        createArticleService = new CreateArticleService(articlesRepository);

        createArticleService.execute({
            title: "Teste",
            featured: false,
            url: "teste",
            imageUrl: "teste",
            newsSite: "teste",
            summary: "teste",
            publishedAt: "teste"
        });
    });

    it('should be return all articles', async () => {
        const articles = await service.execute();

        expect(articles).toHaveLength(1);
    });

});