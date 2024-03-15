import { Router } from "express";
import { getMovies, createMovie, getMovie, deleteMovie, updateMovie } from "../controllers/movies.controller.ts";

const router: Router = Router();

router.get("/movies", getMovies)
router.get("/movies/:id", getMovie)
router.post("/movies", createMovie)
router.delete("/movies/:id", deleteMovie)
router.put("/movies/:id", updateMovie)

export default router