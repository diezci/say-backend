const express = require('express');
const router = express.Router();
const { createJob, getJobs } = require('../controllers/jobController');
const auth = require('../middleware/auth');

router.get('/', getJobs);
router.post('/', auth, createJob);

module.exports = router;