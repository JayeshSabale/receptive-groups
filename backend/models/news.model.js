import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  content: String,
  url: { type: String, required: true, unique: true },
  image: String,
  author: String,
  publishedAt: Date,
  source: String,
})

const News = mongoose.model('News', newsSchema)

export default News
