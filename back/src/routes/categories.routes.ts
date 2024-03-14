import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router();

router.get("/categories", (req, res) => {
    res.send("categories")
})

export default router