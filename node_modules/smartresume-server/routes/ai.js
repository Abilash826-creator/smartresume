const express = require('express');
const { protect } = require('../middleware/auth');
const { improveText } = require('../controllers/aiController');

const router = express.Router();

router.post('/improve-text', protect, improveText);

module.exports = router;
