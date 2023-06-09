'use strict';

const bcrypt = require('bcryptjs');
const { validateUser } = require('../../helpers/userValidation');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(
  './db/users.db',
  sqlite.OPEN_READWRITE,
  (err) => {
    if (err) console.error(err);
  }
);
let sql;

const registration = (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 7);
    sql = 'INSERT INTO users(username, password) VALUES (?,?)';

    validateUser(res, username, password, db, 'signup', () => {
      db.run(sql, [username, hashPassword], (err) => {
        if (err) res.status(300).json({ message: 'Error found' });
        res.status(201).json({ message: 'Created' });
      });
    });
  } catch (error) {
    res.status(300).json({ message: 'Error found' });
  }
};

const login = (req, res) => {
  try {
    const { username, password } = req.body;

    validateUser(res, username, password, db, 'signin', (password, rows) => {
      const userPassword = bcrypt.compareSync(password, rows[0].password);

      if (userPassword) {
        return res.status(400).json({ message: 'Correct Password' });
      } else {
        return res.status(400).json({ message: 'Incorrect password' });
      }
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const getAllUsers = (req, res) => {
  try {
    sql = 'SELECT * FROM users';
    db.all(sql, [], (err, rows) => {
      if (err) res.status(300).json({ message: 'Error found' });
      if (rows.length < 1) res.status(300).json({ message: 'No match' });

      res.status(200).json(rows);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const getUser = (req, res) => {
  try {
    const sql = 'SELECT * FROM users WHERE id = ?';

    db.each(sql, [req.params.id], (err, row) => {
      if (err) res.status(300).json({ message: 'Error found' });
      res.status(200).json(row);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const deleteUser = (req, res) => {
  try {
    const sql = 'DELETE FROM users WHERE id = ?';

    db.run(sql, [req.params.id], (err, row) => {
      if (err) {
        res.status(300).json({ message: 'Error' });
        console.error(err);
      }
      res.status(200).json({ message: 'Deleted' });
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

module.exports = {
  registration,
  login,
  getAllUsers,
  deleteUser,
  getUser
};
