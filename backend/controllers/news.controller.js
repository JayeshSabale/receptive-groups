import axios from 'axios'
import News from '../models/news.model.js' // adjust the path if needed

export const fetchAndStoreNews = async (req, res) => {
  try {
    // Fetch from NewsData.io
    const newsDataResponse = await axios.get(
      `https://newsdata.io/api/1/news?country=in&category=top&apikey=${process.env.NEWSDATA_API_KEY}`
    )

    // Normalize each article
    const normalizeArticle = (article) => ({
      title: article.title,
      description: article.description || '',
      content: article.content || '',
      url: article.link || '',
      image:
        article.image_url ||
        'https://via.placeholder.com/600x400?text=No+Image',
      author: article.creator?.[0] || 'Unknown',
      publishedAt: article.pubDate || new Date(),
      source: article.source_id || 'NewsData.io',
    })

    const normalizedArticles =
      newsDataResponse.data.results.map(normalizeArticle)

    // Clear old news and insert new
    // await News.deleteMany()
    await News.insertMany(normalizedArticles)

    res
      .status(200)
      .json({ message: 'News fetched and stored from NewsData.io.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch news from NewsData.io' })
  }
}

export const getNewsById = async (req, res) => {
  try {
    const post = await News.findById(req.params.id)
    if (!post) {
      res.status(404).json({ message: 'Post not found' })
    }
    return res.status(200).json(post)
  } catch (error) {
    console.log(error)
  }
}

// export const getAllNews = async (req, res) => {
//   const news = await News.find()
//   res.json(news)
// }

export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 }).skip(10)
    res.json(news)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch older news' })
  }
}

export const getLatestNews = async (req, res) => {
  const latest = await News.find().sort({ publishedAt: -1 }).limit(10)
  res.json(latest)
}

export const searchNews = async (req, res) => {
  const { query } = req.query
  const results = await News.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
    ],
  })
  res.json(results)
}
