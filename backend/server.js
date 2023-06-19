'use strict';

const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const cors = require('cors');
const pageRouter = require('./pageRouter');
const authRouter = require('./auth/authRouter');
const booksRouter = require('./books/booksRouter');
const authorsRouter = require('./authors/authorsRouter')
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
app.use('/', emailRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
