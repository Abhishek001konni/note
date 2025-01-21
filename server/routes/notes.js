const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');


// Middleware: Fetch note by ID
const getNoteById = async (req, res, next) => {
    const { id } = req.params;  
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ 
            error: 'Invalid ID',
            details: `Note ID ${id} is invalid`,
    });
}

    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        req.note = note;
        next();

    } catch (err) {
        console.error('Error fetching note: ', err.message);
        res.status(500).json({ 
            error: 'failed to get note ${req.params.id}',
            details: err.message 
        });
    }
};

// Middleware to validate the request body
const validateNote = [
    body('title').isLength({ min: 1 }).withMessage('Title is required'),
    body('content').isLength({ min: 1 }).withMessage('Content is required')
];

// GET: /api/notes
router.get('/', async (req, res) => {
   try {
       const notes = await Note.find();
       res.json(notes);
    } catch (err) {
        console.error('Error getting notes: ', err.message);
        res.status(500).json({ 
            error: 'failed to get notes',
            details: err.message
        });
    }
});

// get a single note
router.get('/:id', getNoteById, (req, res) => {
    res.json(req.note);
});

//Create a new note
router.post('/', validateNote,(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, async (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            content: req.body.content
        });
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        console.error('Error creating note: ', err.message);
        res.status(400).json({ 
            error: 'failed to create note',
            details: err.message
        });
    }
}

);


//Update a note
router.patch('/:id', getNoteById, validateNote, (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); 
   },
async (req, res) => {
    const note = req.note;
    if (req.body.title) note.title = req.body.title;
    if (req.body.content) note.content = req.body.content;

    try {
        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (err) {
        console.error('Error updating note: ', err.message);
        res.status(500).json({
            error: 'failed to update note',
            details: err.message
        });
    }
});

//Delete a note
router.delete('/:id', getNoteById, async(req, res) => {
    try {
        await req.note.deleteOne();
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting note: ', err.message);
        res.status(500).json({
            error: 'failed to delete note',
            details: err.message
        });
    }
});

module.exports = router;