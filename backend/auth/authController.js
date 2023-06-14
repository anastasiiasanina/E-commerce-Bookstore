const bcrypt = require('bcryptjs');
const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('../db/users.db', sqlite.OPEN_READWRITE, (err) => {
  if(err) console.log(err)
})
let sql;

const registration = (req, res) => {
  try {
    const {username, password} = req.body;
    sql = "INSERT INTO users(username, password) VALUES (?,?)"
    db.run(sql, [username, password], (err) => {
      if(err) res.status(300).json({ message: 'Error found' });
      console.log('succes: ', username, password)
    });

    res.status(201).json("Created");
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
}

const login = (req, res) => {
  try {
    
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
}

module.exports = {
  registration,
  login
}