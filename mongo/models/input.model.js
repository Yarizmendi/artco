
import mongoose from 'mongoose'

const inputSchema = new mongoose.Schema({
  icon: String,
  type: String,
  label: String,
  uniform: String,
  settings: Object,
  description: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
})

export default mongoose.models.Input || mongoose.model('Input', inputSchema)