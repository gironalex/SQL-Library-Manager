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
  const books = await Book.findAll({
    attributes: ['id', 'title', 'author', 'genre', 'year'],
    order: [["title", "ASC"]]
  });
  res.render("index", { books, title: 'Library' }) 
}));

module.exports = router;