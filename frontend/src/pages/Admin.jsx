import React, { useEffect, useState } from 'react'
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Add this if using React Router

function Admin() {
  const [feedbackList, setFeedbackList] = useState([])
  const [filterCategory, setFilterCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate() // React Router navigation

  const categories = [
    'All',
    'Work Environment',
    'Leadership',
    'Growth',
    'Others',
  ]

  useEffect(() => {
    fetchAllFeedbacks()
  }, [])

  const fetchAllFeedbacks = async () => {
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:5000/api/feedback')
      if (Array.isArray(res.data)) {
        setFeedbackList(res.data)
      } else {
        setFeedbackList([])
        setError('Invalid response from server')
      }
    } catch (err) {
      console.error('Failed to fetch feedbacks', err)
      setError('Failed to fetch feedbacks')
    } finally {
      setLoading(false)
    }
  }

  const fetchFilteredFeedbacks = async (category) => {
    try {
      setLoading(true)
      const res = await axios.get(
        `http://localhost:5000/api/feedback/filter?category=${category}`
      )
      if (Array.isArray(res.data)) {
        setFeedbackList(res.data)
      } else {
        setFeedbackList([])
        setError('Invalid filtered response')
      }
    } catch (err) {
      console.error('Failed to fetch filtered feedbacks', err)
      setError('Failed to fetch filtered feedbacks')
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryFilter = (e) => {
    const selectedCategory = e.target.value
    setFilterCategory(selectedCategory)
    setError('')

    if (selectedCategory === 'All') {
      fetchAllFeedbacks()
    } else {
      fetchFilteredFeedbacks(selectedCategory)
    }
  }

  const handleToggleReviewed = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/feedback/${id}/reviewed`, {
        review: !currentStatus,
      })
      filterCategory === 'All' || filterCategory === ''
        ? fetchAllFeedbacks()
        : fetchFilteredFeedbacks(filterCategory)
    } catch (err) {
      console.error('Error updating feedback', err)
      setError('Error updating feedback')
    }
  }

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Admin - Feedback Dashboard</h2>
        </Col>
        <Col className="text-end">
          <Button variant="secondary" onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Select value={filterCategory} onChange={handleCategoryFilter}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : feedbackList.length === 0 ? (
        <p className="text-muted">No feedback found for this category.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Feedback</th>
              <th>Category</th>
              <th>Submitted At</th>
              <th>Reviewed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map((fb) => (
              <tr key={fb._id}>
                <td>{fb.myFeedback}</td>
                <td>{fb.category}</td>
                <td>
                  {fb.createdAt
                    ? new Date(fb.createdAt).toLocaleString()
                    : 'N/A'}
                </td>
                <td
                  className={
                    fb.reviewed ? 'text-success fw-bold' : 'text-danger fw-bold'
                  }
                >
                  {fb.reviewed ? 'Yes' : 'No'}
                </td>
                <td>
                  <Button
                    variant={fb.reviewed ? 'warning' : 'success'}
                    size="sm"
                    onClick={() => handleToggleReviewed(fb._id, fb.reviewed)}
                  >
                    {fb.reviewed ? 'Mark as Unreviewed' : 'Mark as Reviewed'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default Admin
