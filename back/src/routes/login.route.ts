import { Router } from "express";
import { loginUser } from "../controllers/login.controller.ts";

const router: Router = Router();

router.get("/login", (req, res) => {
    res.send("login")
})

router.post("/login", loginUser)

export default router