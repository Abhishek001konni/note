const express = require('express');
const router = express.Router();
const Paste = require('../models/Paste');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

// Middleware to fetch paste by id
const getPasteById = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            error: 'Invalid ID',
            details: 'Paste id is invalid'
        });
    }

    try {
        const paste = await Paste.findById(id);
        if (!paste) {
            return res.status(404).json({ error: 'Paste not found' });
        }
        req.paste = paste;
        next();
    } catch (err) {
        console.error('Error fetching paste:', err.message);
        res.status(500).json({
            error: 'failed to fetch paste',
            details: err.message,
        });
    }
}

// validation middleware
const validatePaste = [
    body('content').isLength({ min: 1 }).withMessage('Content is required')
];

// POST: create a new paste
router.post('/', validatePaste, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Validation Error', details: errors.array() });
    }

    try {
        const { content, expiresAt } = req.body;
        const paste = new Paste({ content, expiresAt });
        const savedPaste = await paste.save();
        res.status(201).json({ link: `/api/paste/${savedPaste._id}` });
    }
    catch (err) {
        console.error('Error saving paste:', err.message);
        res.status(500).json({
            error: 'failed to save paste',
            details: err.message
        });
    }

});

// GET: fetch a single paste by id
router.get('/:id', getPasteById, (req, res) => {
    res.json(req.paste);
});

//DELETE: delete a paste by id
router.delete('/:id', getPasteById, async (req, res) => {
    try {
        await req.paste.deleteOne();
        res.json({ message: 'Paste deleted' });
    } 
    catch (err) {
        console.error('Error deleting paste:', err.message);
        res.status(500).json({
            error: 'failed to delete paste',
            details: err.message
        });
    }
});


module.exports = router;
