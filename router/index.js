import { Router } from "express";
import fileRoutes from "./fileRoutes.js";
import linkRoutes from "./linkRoutes.js";


const router = new Router()

router.use('/link', linkRoutes)
router.use('/file', fileRoutes)

export default router