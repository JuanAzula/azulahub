import { useState } from "react";
import { UploadService } from "../services/UploadService"
import { token } from "../services/TokenService";
import { MovieService } from "../services/MovieService";



export const MovieForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState(Number);
    const [img, setImg] = useState('');
    const [genre, setGenre] = useState('');
    const [score, setScore] = useState<string>();


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
            const result = await UploadService.upload(file, { token });
            console.log('result from handleupload', result)
            setImg(result.url)
            setTimeout(() => {
                console.log('img', img)
            }, 800)
            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const movie = {
            title,
            description,
            releaseYear: year,
            poster_img: img,
            genresId: genre,
            score: parseFloat(score || '0')
        };
        MovieService.postMovie(movie, { token })
        window.location.reload()
        console.log(movie);
    }

    return (
        <div className="flex justify-center items-center flex-col space-y-4 absolute left-1/3 top-1/3">
            <h1 className="text-2xl text-green-500">Add a movie</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-14 text-black">
                <input type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <input type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input type="number"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value, 10))}
                    placeholder="Year"
                />
                <input type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Genre"
                />
                <input type="text"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="Score"
                />

                <div>
                    <label htmlFor="file">Poster image:</label>
                    <input type="file" name="file" onChange={handleFileChange} />
                    <span onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Confirm</span>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>
            </form>
        </div>
    )
}