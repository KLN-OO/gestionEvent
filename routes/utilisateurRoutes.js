const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');
const { validateRegister } = require('../middlewares/validationMiddleware');

router.post('/register', validateRegister, utilisateurController.register);
router.post('/login', utilisateurController.login);

module.exports = router;
