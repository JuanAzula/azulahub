import { Router } from "express";
import { postFile } from '../controllers/upload.controller';



const router: Router = Router();

router.post('/upload', postFile);

export default router;