const express = require('express');
const app = express();
const port = 8000;
const pageRouter = require('./pageRouter');

app.use(express.json());
app.use('/', pageRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})