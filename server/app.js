require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const connectDB = require('./config/database');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

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
app.use(notFoundHandler);

// global error handler
app.use(errorHandler);

module.exports = app;
