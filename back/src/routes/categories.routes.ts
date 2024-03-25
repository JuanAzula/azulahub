import { Router } from "express";

const router: Router = Router();

router.get("/categories", (_req, res) => {
    res.send("categories")
})

export default router