import { Router } from "express";
import { getSeries, createSeries, getOneSeries, deleteSeries, updateSeries } from "../controllers/series.controller.ts";

const router: Router = Router();

router.get("/series", getSeries)
router.get("/series/:id", getOneSeries)
router.post("/series", createSeries)
router.delete("/series/:id", deleteSeries)
router.put("/series/:id", updateSeries)

export default router