import axios from "axios";

export class ConsumerService {

    public async getCount() {

        try {
            const response = await axios.get('https://api.spaceflightnewsapi.net/v3/articles/count');

            return response.data;
        } catch (error: any) {
            console.log(error.message);
        }

    }

    public async getArticles(page: number = 1, limit: number = 10) {
            
        try {
            const response = await axios.get(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${limit}&_start=${(page - 1) * limit}`);
    
            return response.data;
        } catch (error: any) {
            console.log(error.message);
        }
    
    }

}