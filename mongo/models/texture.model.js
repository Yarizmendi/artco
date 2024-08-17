
import mongoose from 'mongoose'

const textureSchema = new mongoose.Schema({
    type: String,
    uniform: String,
})

export default mongoose.models.Texture || mongoose.model('Texture', textureSchema)