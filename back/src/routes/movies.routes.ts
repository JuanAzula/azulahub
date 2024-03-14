import { Router } from "express";
import { getMovies, createMovie } from "../controllers/movies.controller.js";

const router: Router = Router();

router.get("/movies", getMovies)
router.post("/movies", createMovie)

export default router