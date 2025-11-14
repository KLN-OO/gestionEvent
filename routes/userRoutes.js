const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireRole } = require('../middlewares/requireRole');
router.get('/me/events', requireRole(['organisateur', 'admin']), userController.getUserEvents);

module.exports = router;
