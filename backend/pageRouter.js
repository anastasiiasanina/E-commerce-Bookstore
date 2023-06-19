'use strict';

const Router = require('express');
const router = new Router();
const controller = require('./pageController');

// Redirect from root to home page
router.get('/', controller.redirectToHomePage);

router.get('/home', controller.getHomePage);
router.get('/catalog', controller.getCatalogPage);
router.get('/search', controller.getSearchPage);
router.get('/signup', controller.getSignUpPage);
router.get('/signin', controller.getSignInPage);

module.exports = router;
