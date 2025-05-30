import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddFeedback, Admin } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddFeedback />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
