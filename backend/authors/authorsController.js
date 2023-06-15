const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('./db/books.db', sqlite.OPEN_READWRITE, (err) => {
  if(err) console.log(err)
})
let sql;

const addAuthor = (req, res) => {
  try {
    const {name} = req.body;
    sql = "INSERT INTO authors(name) VALUES (?)"
    db.run(sql, [name], (err) => {
      if(err) res.status(300).json({ message: 'Error found' });
      console.log('success: ', name)
    });

    res.status(201).json("Created");
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
}

const getAuthor = (req, res) => {
  try {
    
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
}

const deleteAuthor = (req, res) => {
  try {
    
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
}

module.exports = {
  addAuthor,
  getAuthor,
  deleteAuthor
}