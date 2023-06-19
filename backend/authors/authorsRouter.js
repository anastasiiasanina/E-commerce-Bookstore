const Router = require('express');
const router = new Router();
const controller = require('./authorsController');

router.post('/api/v1/authors', controller.addAuthor);
router.get('/api/v1/authors/:id', controller.getAuthor);
router.get('/api/v1/authors', controller.getAllAuthors);
router.delete('/api/v1/authors/:id', controller.deleteAuthor);

module.exports = router;