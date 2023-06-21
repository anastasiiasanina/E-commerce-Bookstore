'use strict';

const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const pageRouter = require('./pageRouter');
const authRouter = require('./API/auth/authRouter');
const booksRouter = require('./API/books/booksRouter');
const authorsRouter = require('./API/authors/authorsRouter');
const genresRouter = require('./API/genres/genresRouter');
const emailRouter = require('./API/email/emailRouter');
const cartRouter = require('./API/cart/cartRouter');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/', pageRouter);
app.use('/', authRouter);
app.use('/', booksRouter);
app.use('/', authorsRouter);
app.use('/', genresRouter);
app.use('/', emailRouter);
app.use('/', cartRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
