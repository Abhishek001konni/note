const express = require('express');
const router = express.Router();
const Paste = require('../models/Paste');
const getById = require('../middleware/getById');
const pasteController = require('../controllers/pasteController');
const { body, validationResult } = require('express-validator');



// validation middleware
const validatePaste = [
    body('content').isLength({ min: 1 }).withMessage('Content is required')
];


/* POST create a new paste */
router.post('/', validatePaste, pasteController.createPaste);

/* GET fetch a paste by id */
router.get('/:id', getById(Paste, 'paste'), pasteController.getPaste);

/* DELETE delete a paste by id */
router.delete('/:id', getById(Paste, 'paste'), pasteController.deletePaste);

module.exports = router;
