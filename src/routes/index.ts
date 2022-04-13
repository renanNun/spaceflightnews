import { Router } from "express";
import WelcomeController from "../app/controllers/WelcomeController";
import articlesRouter from "./articles.routes";

const router = Router();

router.get('/', new WelcomeController().handle);
router.use('/articles', articlesRouter);

export default router;