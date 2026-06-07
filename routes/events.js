const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const authMiddleware = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/requireRole');
const canModifyEvent = require('../middlewares/canModifyEvent');

// Routes publiques
router.get('/', eventsController.getAllPublic);
router.get('/filtered', eventsController.getFilteredPublic);
router.get('/:id', eventsController.getByIdPublic);

// Routes protégées (organisateur/admin)
router.post('/', authMiddleware, requireRole(['organisateur', 'admin']), eventsController.create);
router.put('/:id', authMiddleware, canModifyEvent, eventsController.update);
router.patch('/:id/publish', authMiddleware, canModifyEvent, eventsController.publish);
router.delete('/:id', authMiddleware, canModifyEvent, eventsController.delete);
router.post('/:id/image', authMiddleware, canModifyEvent, eventsController.uploadImage);

module.exports = router;
