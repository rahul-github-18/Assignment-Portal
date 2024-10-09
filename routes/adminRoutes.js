const express = require('express');
const { register, login, getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/assignments', authMiddleware, getAssignments);
router.post('/assignments/:id/accept', authMiddleware, acceptAssignment);
router.post('/assignments/:id/reject', authMiddleware, rejectAssignment);

module.exports = router;
