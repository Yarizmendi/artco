
import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    blob: String,
    size: Number,
    title: String,
    displayName: String,
    pathname: String,
    description: String,
    downloadUrl: String,
    type: String,
    contentType: String,

    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    
    uploaderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },

})

export default mongoose.models.Image || mongoose.model('Image', imageSchema)