import { useQuery } from "@tanstack/react-query"
import { MovieService } from "../services/MovieService"
import { SeriesService } from "../services/SeriesService"
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../styles/App.css'
import { TokenService } from '../services/TokenService'
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

const getMovies = async () => {
    const movies = await MovieService.getMovies()
    console.log('movies', movies)
    if (movies === null) {
        console.log('no movies')
        setTimeout(() => {
            getMovies()
        }, 2500)
    }
    return movies

}

const getSeries = async () => {
    const series = await SeriesService.getSeries()
    if (series === null) {
        console.log('no movies')
        setTimeout(() => {
            getSeries()
        }, 2500)
    }
    if (series !== null) {
        return series
    }
}

export const AppRoutes = () => {
    const queryUserLogged = useQuery({
        queryKey: ['userLogged'],
        queryFn: async () => getUser()
    })
    console.log(queryUserLogged.data)

    const queryMovies = useQuery({
        queryKey: ['movies'],
        queryFn: async () => getMovies()
    })
    console.log(queryMovies.data)

    const querySeries = useQuery({
        queryKey: ['series'],
        queryFn: async () => getSeries()
    })
    console.log(querySeries.data)


    const [user, setUser] = useState<User | null>(null)
    console.log(user)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('LoggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            TokenService.setToken(user.token)
            let count = 0
            const checkTokenValidity = async () => {
                const isValidToken = await TokenService.validateToken(user.token);
                console.log('isValidToken', isValidToken)
                if (isValidToken) {
                    count = 0
                }
                else if (!isValidToken && count < 1) {
                    // Token is invalid, perform logout action
                    count += 1
                    setTimeout(() => {
                        checkTokenValidity()
                    }, 10000)
                } else if (!isValidToken && count >= 1) {
                    alert('Token is invalid, perform logout action');
                    HandleLogout();
                }
            };
            console.log('checkTokenValidity', user.token)
            checkTokenValidity();
        }
    }, [])

    // const navigate = useNavigate()

    const HandleLogout = () => {
        window.localStorage.removeItem('LoggedUser')

        setUser(null)
        window.location.reload()
    }

    return (
        <BrowserRouter>
            <button className="text-2xl text-green-500 absolute top-0 right-0 mt-4 mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={HandleLogout}>Logout</button>
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
                                <Login />
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