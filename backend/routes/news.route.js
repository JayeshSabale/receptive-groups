import express from 'express'
import {
  fetchAndStoreNews,
  getAllNews,
  getLatestNews,
  searchNews,
  getNewsById,
} from '../controllers/news.controller.js'

const router = express.Router()

router.get('/sync', fetchAndStoreNews)
router.get('/', getAllNews)
router.get('/latest', getLatestNews)
router.get('/search', searchNews)
router.get('/:id', getNewsById)

export default router
