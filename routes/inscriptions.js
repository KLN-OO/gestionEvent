const express = require('express');
const router = express.Router();
const inscriptionsController = require('../controllers/inscriptionsController');
const { requireRole } = require('../middlewares/requireRole');
const canModifyEvent = require('../middlewares/canModifyEvent');

router.post('/events/:id/inscriptions', requireRole(['user', 'organisateur', 'admin']), inscriptionsController.create);
router.delete('/:id', requireRole(['user', 'organisateur', 'admin']), inscriptionsController.cancel);
router.get('/events/:id/inscriptions', canModifyEvent, inscriptionsController.getByEvent);

module.exports = router;
