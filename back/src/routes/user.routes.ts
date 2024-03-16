import { Router } from "express";
import { getUser, createUser, deleteUser, getUserById } from "../controllers/user.controller.ts";

const router: Router = Router();

router.get("/users", getUser)
router.post("/users", createUser)
router.delete("/users/:id", deleteUser)
router.get("/users/:id", getUserById)

export default router