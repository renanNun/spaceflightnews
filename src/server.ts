import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import './database';
import { errors } from "celebrate";
import { AppError } from "./errors/AppError";

const app = express();
app.use(express.json());
app.use(cors());
app.use(errors());

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: "error",
                message: err.message
            });
        }

        // console.error(err);

        return response.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
)

app.use(router);

app.listen(3333, () => {
    console.log("Server started on port 3333");
});