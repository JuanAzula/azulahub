import { Router } from "express";
import { uploadFile } from '../controllers/upload.controller';



const router: Router = Router();

router.post('/upload', uploadFile);

export default router;