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
  const books = await Book.findAll();
  res.render('index', { books: books, title: 'Books' }); 
}));

/* GET new Book form */
router.get('/new', asyncHandler(async (req, res) => {
  res.render('books/new-book', { book: {}, errors: false, title: 'New Book' }); 
}));

/* POST create book */
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books/");
  } catch (error) {
    if(error.name === "SequelizeValidationError") { 
      book = await Book.build(req.body);
      res.render("books/new-book", { errors: error.errors, title: "New Book" })
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }  
  }
}));

/* GET update book form */
router.get("/:id", asyncHandler(async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("books/update-book", { book, title: "Update Book" });      
  } else {
    res.sendStatus(404);
  }
}));

/* POST update book */
router.post('/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect("/books"); 
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id; // make sure correct book gets updated
      res.render("books/update-book", { book, errors: error.errors, title: "Edit Book" })
    } else {
      throw error;
    }
  }
}));


module.exports = router;
