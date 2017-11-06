const mongoose = require('mongoose')

const FbSchema = new mongoose.Schema({
  fb_id: String,
  name: String,
  email: String
}, {
  timestamps: true
})

const fbuser = mongoose.model('fbuser', FbSchema)

module.exports = fbuser
