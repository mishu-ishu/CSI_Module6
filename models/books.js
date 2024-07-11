const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true
  },
  autherName: {
    type: String,
    required: true,
    default: 'annonymous'
  },
  pageCount: {
    type: Number,
    required: true
  }
  
})

module.exports = mongoose.model('Book', bookSchema)