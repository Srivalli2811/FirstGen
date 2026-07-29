const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const moodController = require('../controllers/moodController');

router.post('/log', auth, moodController.logMood);
router.get('/history', auth, moodController.getMoods);
router.get('/today', auth, moodController.getTodayMood);

module.exports = router;