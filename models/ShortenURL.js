const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema內容項目待確認
const ShortenURLSchema = new Schema({
  originalURL: {
    type: String,
    required: true
  },
  keyword: {
    type: String,
    required: true
  },
  newURL: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('ShortenURL', ShortenURLSchema)