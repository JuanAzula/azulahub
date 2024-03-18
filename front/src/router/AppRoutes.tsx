import { useQuery } from "@tanstack/react-query"
import { MovieService } from "../services/MovieService"
import { SeriesService } from "../services/SeriesService"
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../styles/App.css'
import { TokenService } from '../services/MovieService'
import { Login } from "../components/LoginForm"
import { Home } from "../components/Home"




const getUser = () => {
    const loggedUserJSON = window.localStorage.getItem('LoggedUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        return user
    }
    else {
        return null
    }
}

const getMovies = () => {
    const movies = MovieService.getMovies()
    if (movies) {
        return movies
    }
}

const getSeries = () => {
    const series = SeriesService.getSeries()
    if (series) {
        return series
    }
}

export const AppRoutes = () => {
    const queryUserLogged = useQuery({
        queryKey: ['userLogged'],
        queryFn: async () => getUser()
    })

    const queryMovies = useQuery({
        queryKey: ['movies'],
        queryFn: async () => getMovies()
    })

    const querySeries = useQuery({
        queryKey: ['series'],
        queryFn: async () => getSeries()
    })

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('LoggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            TokenService.setToken(user.token)
        }
    }, [])

    // const navigate = useNavigate()

    const HandleLogout = () => {
        window.localStorage.removeItem('LoggedUser')
        if (user) {
            setUser(null)
            TokenService.setToken(user?.token)
            window.location.reload()
        }
    }

    return (
        <BrowserRouter>
            {queryUserLogged.data
                ? (
                    <>

                    </>
                )
                : null}
            <Routes>
                <Route
                    path="/"
                    element={
                        queryUserLogged.data
                            ? (
                                <Home user={queryUserLogged.data} movies={queryMovies.data} series={querySeries.data} />
                            )
                            : (
                                <Login setUser={setUser} />
                            )
                    }
                />
                <Route
                    path="/login"
                    element={
                        queryUserLogged.data
                            ? (
                                <Home user={queryUserLogged.data} movies={queryMovies.data} series={querySeries.data} />
                            )
                            : (
                                <Login />
                            )
                    }
                />
                {/* <Route path="/tracks/:trackId" element={<SongPage />} /> */}
                {/* <Route path="/search" element={<SearchPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/playlists" element={<PlaylistPage />} />
        <Route path="/library/favtracks" element={<FavTracks/>} /> */}
                {/* <Route
                    path="/user"
                    element={<UserPage user={queryUserLogged.data} />}
                /> */}
                {/* <Route
                    path="/profile"
                    element={<UserPage user={queryUserLogged.data} />}
                /> */}
                {/* <Route
          path="/signup"
          element={<Signup triggerRefetch={handleLoginSuccess} />}
        /> */}
            </Routes>
        </BrowserRouter>
    )
}