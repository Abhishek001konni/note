require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const connectDB = require('./config/database');

const app = express();
app.disable('x-powered-by');

/* Routes */
const notesRoute = require('./routes/notes');
const todosRoute = require('./routes/todo');
const pasteRoute = require('./routes/paste');

/* Connect to MongoDB */
connectDB();

/* Middlewares */
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* APIRoutes */
app.use('/api/notes', notesRoute);
app.use('/api/todo', todosRoute);
app.use('/api/paste', pasteRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});


module.exports = app;
