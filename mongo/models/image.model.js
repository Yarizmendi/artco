
import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    blob: String,
    size: Number,
    title: String,
    displayName: String,
    pathname: String,
    description: String,
    uploadedAt: Date,
    downloadUrl: String,
    type: String,
    
    uploaderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },

})

export default mongoose.models.Image || mongoose.model('Image', imageSchema)