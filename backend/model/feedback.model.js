import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema(
  {
    myFeedback: { type: String, required: true },
    category: {
      type: String,
      enum: ['Work Environment', 'Leadership', 'Growth', 'Others'],
      required: true,
    },
    submissionTime: {
      type: Date,
      default: Date.now,
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Feedback = mongoose.model('Feedback', feedbackSchema)

export default Feedback
