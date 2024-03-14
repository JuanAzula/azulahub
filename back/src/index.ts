import express from 'express'
import { env } from 'process'
import cors from 'cors'
import categoriesRoutes from './routes/categories.routes'
import seriesRoutes from './routes/series.routes'
import moviesRoutes from './routes/movies.routes'
import loginRoutes from './routes/login.route'

const app = express()

app.use(cors())
app.options('*', cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Load routes
app.use('/api', categoriesRoutes)
app.use('/api', seriesRoutes)
app.use('/api', moviesRoutes)
app.use('/api', loginRoutes)

const PORT = env.PORT || 3000
const server = app.listen(PORT, () =>
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
)
