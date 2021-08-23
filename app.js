/* Import Dependencies */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

/* Imported Routes */
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

/* View Engine Setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Middleware */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

/* Testing Connection to the DB and Syncing the model */
const models = require('./models');

(async () => {
  await models.sequelize.sync();
  
  try {
    await models.sequelize.authenticate();
    console.log('Connection to the database successful!');

  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

/* Error Handling */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status === 404) {
      res.status(err.status).render("page-not-found", { err })
  } else {
      err.message = "Server Error";
      res.status(err.status || 500).render("error", { err });
  }
  console.log(`Error Code ${res.status}: ${err.message}`);
});

module.exports = app;
