const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const noteController = require('../controllers/notesController');
const getById = require('../middleware/getById');
const verifyToken = require('../middleware/verifyToken');


// Middleware to validate the request body
const validateNote = [
    body('title').trim()
    .isLength({ min: 1 })
    .withMessage('Title is required')
    .escape(),

    body('content').trim()
    .isLength({ min: 1 })
    .withMessage('Content is required')
    .escape(),
];


/* GET all notes */
router.get('/', verifyToken, noteController.getAllNotes);

/* GET a single note */
router.get('/:id', getById(Note, 'note'), noteController.getNoteById);

/* POST create a new note */
router.post('/', validateNote, noteController.createNote);

/* PUT update a note */
router.patch('/:id', getById(Note, 'note'), validateNote, noteController.updateNote);

/* DELETE a note */
router.delete('/:id', getById(Note, 'note'), noteController.deleteNote);


module.exports = router;
