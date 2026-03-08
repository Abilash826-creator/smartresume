const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require('../controllers/resumeController');

const router = express.Router();

router.use(protect);

router.post('/create', createResume);
router.get('/user', getUserResumes);
router.get('/:id', getResumeById);
router.put('/update/:id', updateResume);
router.delete('/delete/:id', deleteResume);

module.exports = router;
