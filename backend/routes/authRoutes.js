const { Router } = require('express');
const controller = require('../controllers/authController');
const { loginAuth } = require('./middlewares/routeAuth');
const validateRegister = require('./middlewares/validateRegister');

const router = Router();

router.post('/user', validateRegister, controller.registerUser);
router.post('/login', loginAuth, controller.jwtLogin);

module.exports = router;
