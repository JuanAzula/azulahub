import express from 'express'
import { env } from 'process'
import fileUpload from 'express-fileupload';
import cors from 'cors'
import responseTime from 'response-time'
import categoriesRoutes from './routes/categories.routes'
import seriesRoutes from './routes/series.routes'
import moviesRoutes from './routes/movies.routes'
import loginRoutes from './routes/login.route'
import userRoutes from './routes/user.routes'
import uploadRoutes from './routes/upload.routes'
import helmet from 'helmet';
import morgan from 'morgan';


const app = express()

app.use(cors())
app.options('*', cors())

app.use(responseTime())

app.use(helmet());
app.use(morgan('dev'))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
    limits: { fileSize: 10000000 }, // 10MB max file(s) size
    abortOnLimit: true // default: false (if true, files will not be uploaded and an error event will be emitted)
}));

// Load routes
app.use('/api', categoriesRoutes)
app.use('/api', seriesRoutes)
app.use('/api', moviesRoutes)
app.use('/api', loginRoutes)
app.use('/api', userRoutes)
app.use('/api', uploadRoutes)

const PORT = env.PORT || 3333
const server = app.listen(PORT, () =>
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
)
