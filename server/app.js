require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const connectDB = require('./config/database');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const app = express();

/* Routes */
const authRoute = require('./routes/auth');
const notesRoute = require('./routes/notes');
const todosRoute = require('./routes/todo');
const pasteRoute = require('./routes/paste');

/* Connect to MongoDB */
connectDB();

/* Rate Limiting */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});


/* Middlewares */
app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(limiter);
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

/* APIRoutes */
app.use('/api/auth', authRoute);
app.use('/api/notes', notesRoute);
app.use('/api/todo', todosRoute);
app.use('/api/paste', pasteRoute);

// catch 404 and forward to error handler
app.use(notFoundHandler);

// global error handler
app.use(errorHandler);

module.exports = app;
