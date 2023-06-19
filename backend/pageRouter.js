const Router = require('express');
const router = new Router();
const controller = require('./pageController');

router.get('/home', controller.getHomePage);
router.get('/catalog', controller.getCatalogPage);
router.get('/search', controller.getSearchPage);
router.get('/signup', controller.getSignUpPage);
router.get('/signin', controller.getSignInPage);

module.exports = router;