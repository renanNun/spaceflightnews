import { AppError } from "../../errors/AppError";
import FakeArticlesRepository from "../repositories/fakes/FakeArticlesRepository";
import { DeleteArticlesService } from "./DeleteArticleService";

describe('DeleteArticleService', () => {
    let fakeArticlesRepository: FakeArticlesRepository;
    let service: DeleteArticlesService;

    beforeAll(() => {
        fakeArticlesRepository = new FakeArticlesRepository();
        service = new DeleteArticlesService(fakeArticlesRepository);
    });

    it('should be able to delete an article', async () => {
        const article = await fakeArticlesRepository.create({
            title: 'title',
            featured: false,
            url: 'url',
            imageUrl: 'imageUrl',
            newsSite: 'newsSite',
            summary: 'summary',
            publishedAt: 'today'
        });

        await service.execute(article.id);

        const deletedArticle = await fakeArticlesRepository.findById(article.id);

        expect(deletedArticle).toBeUndefined();
    });

    it('should not be able to delete an article that does not exist', async () => {
        await expect(service.execute(1)).rejects.toBeInstanceOf(AppError);
    });
});