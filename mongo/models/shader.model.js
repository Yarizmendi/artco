
import mongoose from 'mongoose'

const shaderSchema = new mongoose.Schema({
    title: String,
    icon: String,
    description: String,

    inputIds: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Input',
        required: true,
      }],

    textureIds: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Texture',
        required: true,
    }],

    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
      },

})

export default mongoose.models.Shader || mongoose.model('Shader', shaderSchema)