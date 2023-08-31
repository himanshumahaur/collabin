const express = require('express');
const authControllers = require('../controllers/auth');

const router = express.Router();

router.get('/signup', authControllers.get_signup);
router.post('/signup', authControllers.post_signup);
router.get('/login', authControllers.get_login);
router.post('/login', authControllers.post_login);
router.get('/logout', authControllers.get_logout);

module.exports = router;