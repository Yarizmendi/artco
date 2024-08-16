
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  type: String,
  status: String,
  username: String,
  password: String,
  updatedAt: Date,
})

export default mongoose.models.User || mongoose.model('User', userSchema)