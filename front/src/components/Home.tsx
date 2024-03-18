interface HomeProps {
    user: any;
    movies: any;
    series: any;
}
export const Home: React.FC<HomeProps> = ({ user, movies, series }) => {
    return (
        <div>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <h2>Movies: {movies.length}</h2>
            <h2>Series: {series.length}</h2>
        </div>
    )
}

