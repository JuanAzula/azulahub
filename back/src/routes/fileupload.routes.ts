import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs-extra';
import { Router } from "express";
import { Request } from 'express';

interface CustomRequest extends Request {
    files: any; // Add the 'files' property to the type definition
}


const router: Router = Router();

router.post('/upload', async (req: CustomRequest, res) => {
    try {
        const file = req.files?.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath);
        await fs.unlink(file.tempFilePath);

        res.send(result.secure_url);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

export default router;