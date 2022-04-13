import { Router } from "express";
import WelcomeController from "../app/controllers/WelcomeController";

const router = Router();

router.get('/', new WelcomeController().handle);

export default router;