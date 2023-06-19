const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database('./books.db', sqlite.OPEN_READWRITE, (err) => {
  if(err) console.log(err)
})

const sql = `CREATE TABLE books(ID INTEGER PRIMARY KEY, name, price, description, genre, author)`;
db.run(sql);