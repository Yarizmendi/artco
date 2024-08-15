
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin:artadmin@cluster0.couko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

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
  
module.exports = mongoose.model('Sketch', sketchSchema);
