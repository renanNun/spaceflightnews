import FakeArticlesRepository from "../repositories/fakes/FakeArticlesRepository";
import { UpdateArticleService } from "./UpdateArticleService";

describe('UpdateArticleService', () => {
    let fakeArticlesRepository: FakeArticlesRepository;
    let service: UpdateArticleService;
    
    beforeAll(() => {
        fakeArticlesRepository = new FakeArticlesRepository();
        service = new UpdateArticleService(fakeArticlesRepository);
    });
    
    it('should be able to update an article', async () => {
        const article = await fakeArticlesRepository.create({
            title: 'title',
            featured: false,
            url: 'url',
            imageUrl: 'imageUrl',
            newsSite: 'newsSite',
            summary: 'summary',
            publishedAt: 'today'
        });

        const updatedArticle = await service.execute(article.id, {
            title: 'new title',
            featured: true,
            url: 'new url',
            imageUrl: 'new imageUrl',
            newsSite: 'new newsSite',
            summary: 'new summary',
            publishedAt: 'today'
        });

        expect(updatedArticle.title).toBe('new title');
        expect(updatedArticle.featured).toBe(true);
        expect(updatedArticle.url).toBe('new url');
        expect(updatedArticle.imageUrl).toBe('new imageUrl');
        expect(updatedArticle.newsSite).toBe('new newsSite');
        expect(updatedArticle.summary).toBe('new summary');
    });

    

});