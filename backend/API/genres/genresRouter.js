'use strict';

const Router = require('express');
const router = new Router();
const controller = require('./genresController');

router.post('/api/v1/genres', controller.addGenre);
router.get('/api/v1/genres/:id', controller.getGenre);
router.get('/api/v1/genres', controller.getAllGenres);
router.delete('/api/v1/genres/:id', controller.deleteGenre);

module.exports = router;
