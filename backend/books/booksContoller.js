const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('./db/books.db', sqlite.OPEN_READWRITE, (err) => {
  if(err) console.log(err)
})
let sql;

const addBook = (req, res) => {
  try {
    const {name, price, description, genre, author} = req.body;
    sql = "INSERT INTO books(name, price, description, genre, author) VALUES (?,?,?,?)"
    db.run(sql, [name, price, description, genre, author], (err) => {
      if(err) res.status(300).json({ message: 'Error found' });
      console.log('success: ', name, price, description, genre, author)
    });

    res.status(201).json("Created");
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
}

const getBook = (req, res) => {
  try {
    
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
}

const deleteBook = (req, res) => {
  try {
    
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
}

module.exports = {
  addBook,
  getBook,
  deleteBook
}