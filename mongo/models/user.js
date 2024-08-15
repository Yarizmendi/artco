
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  type: String,
  status: String,
  username: String,
  password: String,
  updatedAt: Date,
})

module.exports = mongoose.model('User', userSchema);

