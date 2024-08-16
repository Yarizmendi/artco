
import mongoose from 'mongoose'

const sketchSchema = new mongoose.Schema({
    vert: String,
    frag: String,
    blob: String,
    path: String,
    title: String,
    updatedAt: Date,
    displayName: String,
    description: String,
    transitions: Boolean,
  
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
  
    tags: {
      object: [String],
      meta: [String]
    },
  
    images: [Object],
    noises: [Object],
    shaders: [Object],
    textures: [Object],
})
  
export default mongoose.models.Sketch || mongoose.model('Sketch', sketchSchema)