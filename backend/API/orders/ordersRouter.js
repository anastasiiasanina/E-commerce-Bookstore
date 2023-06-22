'use strict';

const Router = require('express');
const router = new Router();
const controller = require('./ordersController');

router.post('/api/v1/orders', controller.addOrder);
router.get('/api/v1/orders', controller.getAllOrders);
router.get('/api/v1/orders/:id', controller.getOrder);
router.delete('/api/v1/orders/:id', controller.deleteOrder);

module.exports = router;
