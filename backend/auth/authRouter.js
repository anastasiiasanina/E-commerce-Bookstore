const Router = require('express');
const router = new Router();
const controller = require('./authController');

router.get('/auth', controller.registration);
router.get('/login', controller.login);

module.exports = router;