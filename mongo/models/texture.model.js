
import mongoose from 'mongoose'

const textureSchema = new mongoose.Schema({
    uniform: {
      type: String,
      unique: true
    },
})

export default mongoose.models.Texture || mongoose.model('Texture', textureSchema)