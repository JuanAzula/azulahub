import { Router } from "express";
import { loginUser, validLogin } from "../controllers/login.controller.ts";

const router: Router = Router();

router.get("/login", (req, res) => {
    res.send("login")
})
router.post("/login/valid", validLogin)
router.post("/login", loginUser)

export default router