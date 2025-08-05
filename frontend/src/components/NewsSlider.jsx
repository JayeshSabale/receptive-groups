import { useNavigate } from 'react-router-dom'

const NewsSlider = ({ articles, title }) => {
  const navigate = useNavigate()

  return (
    <div className="slider-section">
      <h2 className="slider-title">{title}</h2>
      <div className="slider-container">
        {articles.map((news, idx) => (
          <div
            key={idx}
            className="slider-card"
            onClick={() => navigate(`/article/${news._id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={news.image} alt={news.title} />
            <h3>{news.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsSlider
