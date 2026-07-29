const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const counselorMiddleware = require('../middleware/counselor');
const counselorController = require('../controllers/counselorController');

router.get('/students', auth, counselorMiddleware, counselorController.getAllStudents);
router.get('/students/:studentId/moods', auth, counselorMiddleware, counselorController.getStudentMoods);

module.exports = router;