import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs-extra';
import { Request } from "express";

interface CustomRequest extends Request {
    files: any; // Add the 'files' property to the type definition
}

async function uploadFile(req: CustomRequest, res) {
    try {
        const file = req.files?.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath);
        console.log('result', result)
        await fs.unlink(file.tempFilePath);
        console.log('tras fs')

        res.redirect('http://localhost:5173/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

export { uploadFile }