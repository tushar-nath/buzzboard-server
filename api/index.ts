import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import AppConfig from '../config'
import session from 'express-session'
import userRoutes from '../routes/userRoutes'
import discussionRoutes from '../routes/discussionRoutes'
import healthRoute from '../routes/healthRoute'
import commentRoutes from '../routes/commentRoutes'

dotenv.config()

const app = express()

// Set up sessions to store user data
app.use(
  session({
    secret: 'buzzboard-session',
    resave: true,
    saveUninitialized: true,
  })
)

const corsOptions = {
  // TODO: Only allow all origins when running locally but restrict in production
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: AppConfig.BODY_PARSER_LIMIT }))

app.use('/api/users', userRoutes)
app.use('/api/discussions', discussionRoutes)
app.use('/api/healthcheck', healthRoute)
app.use('/api/comments', commentRoutes)

export default app
