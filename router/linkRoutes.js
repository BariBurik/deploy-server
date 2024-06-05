import { Router } from "express";
import linkController from "../controllers/linkController.js";


const router = new Router()

router.post('/linkToFile', linkController.linkToFile)

export default router