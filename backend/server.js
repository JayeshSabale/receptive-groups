import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import connectDB from './config/db.js'
import feedbackRoutes from './routes/feedback.routes.js'
const app = express()

const port = process.env.PORT || 8000

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: '*',
  })
)

app.use('/api/feedback', feedbackRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
