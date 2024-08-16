
import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  published: Boolean,
  author: String,
  content: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
  comments: [{
    user: String,
    content: String,
    votes: Number
  }]
});


export default mongoose.models.Blog || mongoose.model('Blog', blogSchema)
