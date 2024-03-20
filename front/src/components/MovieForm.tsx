import { useState } from "react";
import { UploadService } from "../services/UploadService"
import { token } from "../services/TokenService";



export const MovieForm = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (!file) {
                console.error('No file selected');
                return;
            }
            await UploadService.upload(file, { token });
            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h1>MovieForm</h1>
            <form>
                <input type="file" name="file" onChange={handleFileChange} />
                <button onClick={handleUpload} type="submit">Upload</button>
            </form>
        </div>
    )
}