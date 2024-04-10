import { useState } from "react";
import { MovieForm } from "./MovieForm";
import { MovieService } from "../services/MovieService";
import { token } from "../services/TokenService";


interface HomeProps {
    user: any;
    movies: any;
    series: any;
}
export const Home: React.FC<HomeProps> = ({ user, movies, series }) => {
    const [currentMovie, setCurrentMovie] = useState(null)

    return (
        <div>
            <h1 className="text-2xl text-green-500" >{user?.name}</h1>
            <h2>{user?.email}</h2>
            {movies?.map((movie: any) => (
                <div key={movie?.id}>
                    <h2 >{movie?.title}</h2>
                    <p>{movie?.description}</p>
                    <p>{movie?.releaseYear}</p>
                    <p>{movie?.score}</p>
                    <p>{movie?.author?.email}</p>
                    <p>{movie?.genres?.name}</p>
                    <button
                        data-testid={`delete${movie?.title}`}
                        className="text-red-500"
                        onClick={() => {
                            MovieService.deleteMovie(movie?.id, { token })
                            setTimeout(() => {

                                window.location.reload()
                            }, 100)
                        }
                        }
                    >
                        Delete
                    </button>
                    <br />
                    <button
                        data-testid={`edit${movie?.title}`}
                        className="text-blue-500"
                        onClick={() => setCurrentMovie(movie)}
                    >
                        Edit
                    </button>
                    <img onClick={() => setCurrentMovie(movie)} src={movie?.poster_img} alt="" style={{ width: '200px' }} />
                </div>
            ))}
            {series?.map((series: any) => (
                <h2 key={series?.id}>{series?.title}</h2>
            ))}
            <MovieForm movie={currentMovie} setMovie={setCurrentMovie} />
        </div>
    )
}

