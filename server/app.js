require('dotenv').config();
var mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var notesRoute = require('./routes/notes');
var todosRoute = require('./routes/todos');
var pasteRoute = require('./routes/paste');
const { stat } = require('fs');

var app = express();

/* Connect to MongoDB */
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

  /* Middlewares */
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* APIRoutes */
app.use('/api/notes', notesRoute);
app.use('/api/todos', todosRoute);
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
      message: err.message
      status: err.status || 500
    }
  });
});


module.exports = app;
