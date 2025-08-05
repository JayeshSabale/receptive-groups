import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import newsRoutes from './routes/news.route.js'

dotenv.config()
const app = express()
connectDB()

// ✅ Handle CORS from Vite (localhost:5173)
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow only your frontend
    methods: ['GET', 'POST'],
    credentials: true,
  })
)

app.use(express.json())

app.use('/api/news', newsRoutes)

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
)
