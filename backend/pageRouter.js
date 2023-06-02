const Router = require('express');
const router = new Router();
const controller = require('./pageController');

router.get('/home', controller.getHomePage);

module.exports = router;