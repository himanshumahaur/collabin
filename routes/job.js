const express = require('express');
const jobControllers = require('../controllers/job');
const { genJobs }= require('../middleware/jobMiddleware');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/jobs', requireAuth, genJobs, jobControllers.get_jobs);
router.post('/jobs', requireAuth, jobControllers.post_jobs);
router.get('/post', requireAuth, jobControllers.get_post);
router.post('/post', requireAuth, jobControllers.post_post);
router.get('/jobs/*', requireAuth, genJobs, jobControllers.get_jobs_);


module.exports = router;