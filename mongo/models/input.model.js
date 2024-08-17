
import mongoose from 'mongoose'

const inputSchema = new mongoose.Schema({
  icon: String,
  type: String,
  label: String,
  uniform: String,
  settings: Object,
  description: String,
})

export default mongoose.models.Input || mongoose.model('Input', inputSchema)