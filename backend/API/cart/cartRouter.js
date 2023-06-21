'use strict';

const Router = require('express');
const router = new Router();
const cartController = require('./cartController');

router.post('/api/v1/cart', cartController.createCart);
router.delete('/api/v1/cart', cartController.removeCart);
router.post('/api/v1/cart/add', cartController.addToCart);
router.delete('/api/v1/cart/remove', cartController.removeFromCart);

module.exports = router;
