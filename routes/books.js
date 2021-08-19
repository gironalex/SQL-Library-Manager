var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  }
}

/* GET books listing. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll( { order: [['title', 'ASC']]} );
  res.render('index', { books: books, title: 'Books' }) 
}));

/* Creating new Book form */
router.get('/new', asyncHandler(async (req, res) => {
  res.render('books/new-book', { books: {}, title: 'New Book' }) 
}));

module.exports = router;
