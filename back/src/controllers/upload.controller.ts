import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';
import fs from 'fs-extra';
import { Request, Response } from 'express'



interface CustomRequest extends Request {
    files: any; // Add the 'files' property to the type definition
}

async function postFile(req: CustomRequest | Request, res: Response) {
    const authorization = req.get('authorization')
    console.log('authorization in upload', authorization)
    let token = null

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    let decodedToken = {}
    if (!token) {
        return res.status(401).json({ error: 'No hay token' });
    }
    try {
        console.log('token', token)
        if (!process.env.SECRET) {
            throw new Error('Missing SECRET environment variable');
        }
        console.log('process.env.SECRET', process.env.SECRET)
        decodedToken = jwt.verify(token, process.env.SECRET)
        console.log('decodedToken', decodedToken)
    } catch (err) {
        console.log(err)
        return res.status(401).json({ error: 'token missing blabla invalid' })
    }

    if (!decodedToken) {
        return res.status(401).json({ error: 'decoded token missing' })
    }
    try {
        const file = req.files?.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath);
        console.log('result', result)
        await fs.unlink(file.tempFilePath);
        console.log('tras fs')
        res.status(200).json({ url: result.secure_url });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

export { postFile }