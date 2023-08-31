const express = require('express');
const Detail = require('../models/detail');
const profileControllers = require('../controllers/profile');

const router = express.Router();

router.get('/profile', profileControllers.get_profile);
router.get('/editprofile', profileControllers.get_editprofile);
router.post('/editprofile', profileControllers.post_editprofile);
router.get('/home', profileControllers.get_home);

module.exports = router;