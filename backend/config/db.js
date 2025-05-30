import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const URL = process.env.MONGO_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL)

    console.log(`MongoDB Connected : ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
