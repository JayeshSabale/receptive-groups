import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ArticlePage = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await axios.get(`http://localhost:5000/api/news/${id}`)
      setArticle(res.data)
    }
    fetchArticle()
  }, [id])

  if (!article) return <p>Loading article...</p>

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <img src={article.image} alt={article.title} />
      <p>
        <strong>Author:</strong> {article.author}
      </p>
      <p>
        <strong>Published:</strong>{' '}
        {new Date(article.publishedAt).toLocaleString()}
      </p>
      <p>{article.content || article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read Original
      </a>
    </div>
  )
}

export default ArticlePage
