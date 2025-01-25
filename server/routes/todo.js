const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');


// Middleware to fetch todo by id
const getTodoById = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            error: 'Invalid ID',
            details: 'Todo id is invalid'
        });
    }

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        req.todo = todo;
        next();
    } catch (err) {
        console.error('Error fetching todo:', err.message);
        res.status(500).json({
            error: 'failed to fetch todo',
            details: err.message,
        });
    }
}

// Middleware to validate the request body
const validateTodo = [
    body('task').isLength({ min: 1 }).withMessage('Title is required'),
    body('completed').optional().isBoolean().withMessage('Completed must be a boolean')
];

//GET: fetch all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        console.error('Error getting todos:', err.message);
        res.status(500).json({
            error: 'failed to get todos',
            details: err.message
        });
    }
});

//GET: fetch a single todo by id
router.get('/:id', getTodoById, (req, res) => {
    res.json(req.todo);
});

//POST: create a new todo
router.post('/', validateTodo, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    next();
}, async (req, res) => {
    try {
        const todo = new Todo({
            task: req.body.task,
            completed: req.body.completed
        });
        const result = await todo.save();
        res.status(201).json(result);
    } catch (err) {
        console.error('Error creating todo:', err.message);
        res.status(500).json({
            error: 'failed to create todo',
            details: err.message
        });
    }
});


//PUT: update a todo by id
router.patch('/:id', getTodoById, validateTodo, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    next();
}, async (req, res) => {
    try {
        const todo = req.todo;
        todo.task = req.body.task;
        todo.completed = req.body.completed;
        const result = await todo.save();
        res.json(result);
    } catch (err) {
        console.error('Error updating todo:', err.message);
        res.status(500).json({
            error: 'failed to update todo',
            details: err.message
        });
    }
});

//DELETE: delete a todo by id
router.delete('/:id', getTodoById, async (req, res) => {
    try {
        await req.todo.deleteOne();
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error('Error deleting todo:', err.message);
        res.status(500).json({
            error: 'failed to delete todo',
            details: err.message
        });
    }
});

module.exports = router;
