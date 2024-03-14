import { Router } from "express";
import { getMovies } from "../controllers/movies.controller.js";

const router: Router = Router();

router.get("/movies", getMovies)

export default router