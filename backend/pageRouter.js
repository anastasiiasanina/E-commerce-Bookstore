const Router = require('express');
const router = new Router();
const controller = require('./pageController');

router.get('/home', controller.getHomePage);
router.get('/signup', controller.getSignUpPage);
router.get('/signin', controller.getSignInPage);

module.exports = router;