import express from 'express'
import {
  createFeedback,
  getFeedbacks,
  fiteredFeedbacks,
  updateFeedbackReview,
  deleteFeedback,
} from '../controllers/feedback.controllers.js'

const router = express.Router()

router.get('/', getFeedbacks)

router.post('/', createFeedback)

router.get('/filter', fiteredFeedbacks)

router.delete('/:id', deleteFeedback)

router.put('/:id/reviewed', updateFeedbackReview)

export default router
