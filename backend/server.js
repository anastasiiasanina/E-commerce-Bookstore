const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const pageRouter = require('./pageRouter');
const authRouter = require('./auth/authRouter');
const booksRouter = require('./books/booksRouter');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(cors())
app.use(express.json());
app.use('/', pageRouter);
app.use('/', authRouter);
app.use('/', booksRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})