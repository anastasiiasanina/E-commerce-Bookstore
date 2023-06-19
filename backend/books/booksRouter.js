'use strict'

const Router = require('express');
const router = new Router();
const controller = require('./booksContoller');

router.post('/api/v1/books', controller.addBook);
router.get('/api/v1/books', controller.getAllBooks);
router.get('/api/v1/books/:id', controller.getBook);
router.delete('/api/v1/books/:id', controller.deleteBook);

module.exports = router;