import Feedback from '../model/feedback.model.js'

const createFeedback = async (req, res) => {
  try {
    const { myFeedback, category } = req.body

    if (!myFeedback || !category) {
      return res.status(401).json({ message: 'Please provide all the fields' })
    }

    const newFeedback = await Feedback.create({ myFeedback, category })

    return res
      .status(201)
      .json({ message: 'New feedback created', feedback: newFeedback })
  } catch (error) {
    console.log(error)
    return res.status(500).josn({ message: error.message })
  }
}

const getFeedbacks = async (req, res) => {
  try {
    const allFeedbacks = await Feedback.find()

    return res.status(200).json(allFeedbacks)
  } catch (error) {
    console.log(error)
    return res.status(500).josn({ message: error.message })
  }
}

const fiteredFeedbacks = async (req, res) => {
  try {
    const { category } = req.query

    const feedbacks = await Feedback.find({ category: category })
    return res.status(200).json(feedbacks)
  } catch (error) {
    console.log(error)
    return res.status(500).josn({ message: error.message })
  }
}

const updateFeedbackReview = async (req, res) => {
  try {
    const { review } = req.body

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { reviewed: review },
      { new: true }
    )

    return res.status(200).json({
      message: 'Feedback updated successfully',
      feedback: updatedFeedback,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message }) // fix typo: josn → json
  }
}

const deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id)
    return res.status(200).json({
      message: 'Feedback deleted successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).josn({ message: error.message })
  }
}

export {
  createFeedback,
  getFeedbacks,
  fiteredFeedbacks,
  updateFeedbackReview,
  deleteFeedback,
}
