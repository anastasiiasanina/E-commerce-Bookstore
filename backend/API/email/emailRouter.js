'use strict';

const Router = require('express');
const router = new Router();
const emailController = require('./emailController');

router.post('/api/v1/send-email', emailController.sendEmailEndpoint);

module.exports = router;
