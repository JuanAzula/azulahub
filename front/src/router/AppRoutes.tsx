import { useQuery } from "@tanstack/react-query"
import { MovieService } from "../services/MovieService"
import { SeriesService } from "../services/SeriesService"
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { TokenService } from '../services/MovieService'
import LoginService from '../services/LoginService'
import { Login } from "../components/LoginForm"
import { Home } from "../components/Home"

interface User {
    id: string;
    name: string;
    // Otros campos del usuario
    token: string; // Propiedad token
}


const getUser = () => {
    const loggedUserJSON = window.localStorage.getItem('LoggedUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        return user
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

    // const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [movies, setMovies] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('LoggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            TokenService.setToken(user.token)
        }
    }, [])

    const navigate = useNavigate()

    const HandleLogout = () => {
        window.localStorage.removeItem('LoggedUser')
        if (user) {
            setUser(null)
            TokenService.setToken(user?.token)
            navigate('/')
        }
    }

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()
        console.log('THIS IS SUBMIT')
        try {
            const user = await LoginService.LoginUser({
                username,
                password
            })

            window.localStorage.setItem(
                'LoggedUser', JSON.stringify(user)
            )

            TokenService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
            console.log('USER', user)
            console.log('USER TOKEN', user.token)
            console.log('Username', user.username)
            console.log('Password', user.password)
        } catch (e) {
            // setErrorMessage('Wrong credentials')
            setTimeout(() => {
                // setErrorMessage(null)
            }, 5000)
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
                                <Home user={queryUserLogged.data} />
                            )
                            : (
                                <Login />
                            )
                    }
                />
                <Route
                    path="/login"
                    element={
                        queryUserLogged.data
                            ? (
                                <Home user={queryUserLogged.data} />
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