import { Request, Response } from "express";

export default class WelcomeController {

    public async handle(request: Request, response: Response): Promise<Response> {

        return response.status(200).json({
            message: "Back-end Challenge 2021 🏅 - Space Flight News"
        })
    }

}