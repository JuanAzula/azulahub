import { Router } from "express";

const router: Router = Router();

router.get("/series", (req, res) => {
    res.send("series")
})

export default router