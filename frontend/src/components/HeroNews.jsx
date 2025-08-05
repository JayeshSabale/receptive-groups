import { useState } from 'react'

const MAX_LENGTH = 100

const HeroNews = ({ articles }) => {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="hero-section">
      {articles.map((news, idx) => {
        const isLong = news.description && news.description.length > MAX_LENGTH
        const isExpanded = expandedIndex === idx
        const displayedText = isExpanded
          ? news.description
          : news.description?.slice(0, MAX_LENGTH) + (isLong ? '...' : '')

        return (
          <div key={idx} className="hero-card">
            <img src={news.image} alt={news.title} />
            <h2>{news.title}</h2>
            <p>{displayedText}</p>
            {isLong && (
              <button
                onClick={() => toggleReadMore(idx)}
                className="read-more-btn"
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default HeroNews
