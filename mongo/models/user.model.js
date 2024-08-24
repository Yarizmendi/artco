
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  type: String,
  status: String,
  username: String,
  password: String,
  updatedAt: Date,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
})

export default mongoose.models.User || mongoose.model('User', userSchema)