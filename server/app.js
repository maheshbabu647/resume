import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';
import {fileURLToPath} from 'url'

import indexRouter from './router/index-router.js'
import errorHandler from './middleware/err-handler.js'

const app = express()

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const COOKIE_SECRET = process.env.COOKIE_SECRET || 'cookiesceret'
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(cors({origin : CLIENT_ORIGIN, credentials : true}))

app.use(cookieParser(COOKIE_SECRET))
app.use(express.json({limit : '10mb'}))
app.use(express.urlencoded({extended : true}))

app.get('/health', (req, res) => {res.status(200).send('<h1>The Server is healthy</h1>')})
app.use('/api', indexRouter)

// app.use(express.static(path.join(__dirname, 'dist')));

// app.get(/^(?!\/api).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.use(errorHandler)

export default app