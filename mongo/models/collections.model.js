
import mongoose from 'mongoose'

const collectionSchema = new mongoose.Schema({

    blob: String,
    title: String,
    displayName: String,
    description: String,

    images: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Image',
        required: true,
    }],

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

export default mongoose.models.Collection || mongoose.model('Collection', collectionSchema)