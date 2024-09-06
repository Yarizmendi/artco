
import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    type: String,
    blob: String,
    size: Number,
    title: String,
    pathname: String,
    description: String,
    downloadUrl: String,
    contentType: String,
    displayName: String,

    collectionId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Collection',
    },

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