import { useEffect, useState } from "react";
import { UploadService } from "../services/UploadService"
import { token } from "../services/TokenService";
import { MovieService } from "../services/MovieService";
import { useQueryClient } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';



export const MovieForm = (currentMovie: any, setMovie: any) => {
    const [file, setFile] = useState<File | null>(currentMovie?.movie?.file || null);
    const [title, setTitle] = useState(currentMovie?.movie?.title || '');
    const [description, setDescription] = useState(currentMovie?.movie?.description || '');
    const [year, setYear] = useState(currentMovie?.movie?.releaseYear || Number);
    const [img, setImg] = useState(currentMovie?.movie?.poster_img || '');
    const [genre, setGenre] = useState(currentMovie?.movie?.genresId || '');
    const [score, setScore] = useState<string>(currentMovie?.movie?.score || '0');

    const queryClient = useQueryClient();

    const user: User | undefined = queryClient.getQueryData(['userLogged'])

    useEffect(() => {
        setFile(currentMovie?.movie?.file || null)
        setTitle(currentMovie?.movie?.title || '')
        setDescription(currentMovie?.movie?.description || '')
        setYear(currentMovie?.movie?.releaseYear || Number)
        setImg(currentMovie?.movie?.poster_img || '')
        setGenre(currentMovie?.movie?.genresId || '')
        setScore(currentMovie?.movie?.score || '0')
    }, [currentMovie])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleCancel = () => {
        setMovie(null);
    };

    const handleUpload: any = async () => {
        try {
            if (!file) {
                console.error('No file selected');
                return;
            }
            const result = await UploadService.upload(file, { token });
            setImg(result.url)
            alert('File uploaded successfully');
            return result
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (currentMovie?.movie?.id) {
            const movie = {
                id: currentMovie?.movie?.id,
                title,
                description,
                releaseYear: year,
                poster_img: img,
                genresName: genre,
                authorEmail: currentMovie?.movie?.author?.email,
                score: parseFloat(score || '0')
            }
            MovieService.patchMovie(movie, { token })
            toast.success('Movie updated')
            setTimeout(() => {
                window.location.reload()
            }, 250)
        } else {

            const movie = {
                title,
                description,
                releaseYear: year,
                poster_img: img,
                genresName: genre,
                authorEmail: user?.email,
                score: parseFloat(score || '0')
            };
            MovieService.postMovie(movie, { token })
            toast.success('Movie added')
            setTimeout(() => {
                window.location.reload()
            }, 250)
        }
    }

    return (
        <div className="flex justify-center items-center flex-col space-y-4 absolute left-1/3 top-1/3">
            <h1 className="text-2xl text-green-500">Add a movie</h1>
            <form className="flex flex-col space-y-14 text-black">
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
                    <input type="file" name="file" data-testid="file-input" onChange={handleFileChange} />
                    <span
                        onClick={() => {
                            toast.promise(
                                new Promise<any>((resolve, reject) => {
                                    handleUpload()
                                        .then(setTimeout(() => resolve({}), 3000))
                                        .catch(reject);
                                }), {
                                loading: 'Adding image...',
                                success: 'Image added!',
                                error: 'Could not add Image'
                            }
                            )
                        }}
                        data-testid="upload-button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Confirm
                    </span>
                </div>
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>
                <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
            </form>
            <Toaster />
        </div>
    )
}