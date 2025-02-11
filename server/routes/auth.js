const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/* POST sign up a new user */
router.post('/signup', authController.signup);

/* POST login a user */
router.post('/login', verifyToken, authController.login);



module.exports = router;

