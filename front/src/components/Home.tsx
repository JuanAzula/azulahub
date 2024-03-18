interface HomeProps {
    user: any;
    movies: any;
    series: any;
}
export const Home: React.FC<HomeProps> = ({ user, movies, series }) => {
    return (
        <div>
            <h1 className="text-2xl text-green-500" >{user.name}</h1>
            <h2>{user.email}</h2>
            {movies?.map((movie: any) => (
                <div key={movie?.id}>
                    <h2 >{movie?.title}</h2>
                    <img src={movie?.poster_img} alt="" style={{ width: '200px' }} />
                </div>
            ))}
            {series?.map((series: any) => (
                <h2 key={series?.id}>{series?.title}</h2>
            ))}
        </div>
    )
}

