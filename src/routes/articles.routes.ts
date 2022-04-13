import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import { ListAllArticlesController } from "../app/controllers/ListAllArticlesController";

const articlesRouter = Router();

articlesRouter.get(
    '/', 
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().min(1),
            limit: Joi.number().min(1),
        }
    }),
    new ListAllArticlesController().handle
    );

export default articlesRouter;