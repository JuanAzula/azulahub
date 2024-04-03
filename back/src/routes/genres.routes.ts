import { Router } from "express";
import { createGenre } from "../controllers/genres.controller.ts";

const router: Router = Router();

router.post("/genres", createGenre)

export default router