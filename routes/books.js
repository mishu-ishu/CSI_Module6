const express = require('express')
const router = express.Router()
const Book = require('../models/books')

router.get('/', async(req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

router.get('/:id', getBook, (req, res) => {
  res.send(res.book)
})

router.post('/', async(req, res) => {
  const book = new Book({
    bookName: req.body.bookName,
    autherName: req.body.autherName,
    pageCount: req.body.pageCount
  })
  try {
    const newBook = await book.save()
    res.status(201).json(newBook)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.patch('/:id', getBook, async(req, res) => {
  if (req.body.bookName != null) {
    res.book.bookName = req.body.bookName
  }
  if (req.body.autherName != null) {
    res.book.autherName = req.body.autherName
  }
  if (req.body.pageCount != null) {
    res.book.pageCount = req.body.pageCount
  }

  try{
    const updatedBook = await res.book.save()
    res.json(updatedBook)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
})

router.delete('/:id', async(req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id)
    if (deletedBook == null) {
      return res.status(404).json({ message: 'Cannot find book' })
    }
    res.json({ message: 'Book deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message})
  }
})

async function getBook(req, res, next) {
  let book
  try{
    book = await Book.findById(req.params.id)
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message})
  }

  res.book = book
  next()
}

module.exports = router