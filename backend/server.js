'use strict';

const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const pageRouter = require('./pageRouter');
const emailRouter = require('./email/emailRouter');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/', pageRouter);
app.use('/', emailRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
