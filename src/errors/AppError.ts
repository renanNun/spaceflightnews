export class AppError extends Error {
    public statusCode: number;

    constructor(public message: string, statusCode = 400) {
        super(message);

        this.statusCode = statusCode;
    }
}