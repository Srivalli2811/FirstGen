const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const chatController = require('../controllers/chatController');

router.post('/send', auth, chatController.sendMessage);
router.get('/history', auth, chatController.getChatHistory);

module.exports = router;