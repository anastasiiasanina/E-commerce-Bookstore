'use strict';

const Router = require('express');
const router = new Router();
const controller = require('./authController');

router.post('/api/v1/users/auth', controller.registration);
router.get('/api/v1/users/login', controller.login);
router.get('/api/v1/users/all', controller.getAllUsers);
router.delete('/api/v1/users/:id', controller.deleteUser);
router.get('/api/v1/users/:id', controller.getUser);

module.exports = router;
