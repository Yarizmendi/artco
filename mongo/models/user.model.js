
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  avatar: String,

  username: {
    type: String,
    unique: true
  },

  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },

})

export default mongoose.models.User || mongoose.model('User', userSchema)