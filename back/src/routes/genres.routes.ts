import { Router } from "express";
import { createGenre, getGenres, getGenre, deleteGenre } from "../controllers/genres.controller.ts";

const router: Router = Router();

router.get("/genres", getGenres)
router.get("/genres/:name", getGenre)
router.post("/genres", createGenre)
router.delete("/genres/:name", deleteGenre)

export default router