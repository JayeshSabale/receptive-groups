import { useEffect, useState } from 'react'
import axios from 'axios'
import HeroNews from './components/HeroNews'
import NewsSlider from './components/NewsSlider'
import './index.css'

function App() {
  const [latest, setLatest] = useState([])
  const [older, setOlder] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchNews = async () => {
      const res = await axios.get('http://localhost:5000/api/news/latest')
      setLatest(res.data)
      const all = await axios.get('http://localhost:5000/api/news')
      // setOlder(all.data.slice(10))
      setOlder(all.data)
    }
    fetchNews()
  }, [])

  const handleSearch = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/news/search?query=${search}`
    )
    setSearchResults(res.data)
  }

  return (
    <div className="container">
      <h1 className="title">📰 News Portal</h1>

      <input
        type="text"
        placeholder="Search articles..."
        className="search-input"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />

      {searchResults.length > 0 ? (
        <NewsSlider articles={searchResults} title="Search Results" />
      ) : (
        <>
          <HeroNews articles={latest} />
          <NewsSlider articles={older} title="Older Articles" />
        </>
      )}
    </div>
  )
}

export default App
