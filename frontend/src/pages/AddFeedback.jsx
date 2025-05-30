import { useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function AddFeedback() {
  const initialState = { myFeedback: '', category: '' }
  const [formData, setFormData] = useState(initialState)

  const navigate = useNavigate()

  const categories = ['Work Environment', 'Leadership', 'Growth', 'Others']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        'http://localhost:5000/api/feedback',
        formData
      )
      console.log('Feedback submitted:', res.data)
      setFormData(initialState)
      navigate('/admin')
    } catch (err) {
      console.error('Error submitting feedback:', err)
    }
  }

  const goToAdmin = () => {
    navigate('/admin')
  }

  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light"
    >
      <h1 className="mb-4 text-primary text-center">
        Add Feedback - Employee Page
      </h1>

      <Form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-white"
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <h4 className="mb-4 text-center">Share Your Thoughts</h4>

        <Form.Group className="mb-3" controlId="feedbackText">
          <Form.Label>Your Feedback</Form.Label>
          <Form.Control
            type="text"
            name="myFeedback"
            placeholder="Enter feedback"
            value={formData.myFeedback}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="categorySelect">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-2">
          Submit
        </Button>

        <Button variant="secondary" onClick={goToAdmin} className="w-100">
          Go to Admin Page
        </Button>
      </Form>
    </Container>
  )
}

export default AddFeedback
