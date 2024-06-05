import { Router } from "express";
import fileController from "../controllers/fileController.js";


const router = new Router() 

router.post('/load', fileController.loadFile)
router.post('/fileToHtml', fileController.fileToHtml)

export default router