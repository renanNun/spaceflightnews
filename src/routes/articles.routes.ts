import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import { CreateArticleController } from "../app/controllers/CreateArticleController";
import { ListAllArticlesController } from "../app/controllers/ListAllArticlesController";
import { ShowArticlesController } from "../app/controllers/ShowArticleController";

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

articlesRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            featured: Joi.boolean(),
            url: Joi.string().required(),
            imageUrl: Joi.string().required(),
            newsSite: Joi.string().required(),
            summary: Joi.string().required(),
            publishedAt: Joi.string().required(),
        }
    }),
    new CreateArticleController().handle
    );

articlesRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required().min(0),
        }
    }),
    new ShowArticlesController().handle
)

export default articlesRouter;