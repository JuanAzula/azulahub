import { Router } from "express";
import { search, searchGenres } from "../controllers/search.controller.ts";

const router: Router = Router();

router.get("/search/:term", search)
router.get("/search/genres/:id", searchGenres)

export default router