'use strict';

const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const cors = require('cors');
const pageRouter = require('./pageRouter');
const authRouter = require('./API/auth/authRouter');
const booksRouter = require('./API/books/booksRouter');
const authorsRouter = require('./API/authors/authorsRouter');
const genresRouter = require('./API/genres/genresRouter')
const bodyParser = require('body-parser');
const emailRouter = require('./email/emailRouter');

app.use(bodyParser.json());
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/', pageRouter);
app.use('/', authRouter);
app.use('/', booksRouter);
app.use('/', authorsRouter);
app.use('/', genresRouter);
app.use('/', emailRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
