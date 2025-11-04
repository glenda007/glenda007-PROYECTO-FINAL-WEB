const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const { validateUser } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', login);
router.get('/me', auth, getMe);

module.exports = router;