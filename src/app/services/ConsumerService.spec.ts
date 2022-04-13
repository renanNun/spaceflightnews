import { ConsumerService } from "./ConsumerService";

describe('ConsumerService', () => {
    let service: ConsumerService;

    beforeAll(() => {
        service = new ConsumerService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a number', async () => {
        const result = await service.getCount();
        expect(typeof result).toBe('number');
    });

    it('should return an array', async () => {
        const result = await service.getArticles();
        expect(Array.isArray(result)).toBeTruthy();
    });
});