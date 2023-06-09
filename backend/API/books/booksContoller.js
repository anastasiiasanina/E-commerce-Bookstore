'use strict';

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(
  './db/books.db',
  sqlite.OPEN_READWRITE, (err) => {
    if (err) console.error(err);
  });
let sql;

const addBook = (req, res) => {
  try {
    const { name, price, description, genre, author, amount } = req.body;
    sql = 'INSERT INTO books(name, price, description, genre, author, amount)' +
      ' VALUES (?,?,?,?,?,?)';
    db.run(sql, [name, price, description, genre, author, amount], (err) => {
      if (err) res.status(300).json({ message: 'Error found' });
    });

    res.status(201).json('Created');
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const getAllBooks = (req, res) => {
  try {
    sql = 'SELECT * FROM books';
    db.all(sql, [], (err, rows) => {
      if (err) res.status(300).json({ message: 'Error found' });
      if (rows.length < 1) res.status(300).json({ message: 'No match' });

      res.status(200).json(rows);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const getBook = (req, res) => {
  try {
    const sql = 'SELECT * FROM books WHERE id = ?';

    db.each(sql, [req.params.id], (err, row) => {
      if (err) res.status(300).json({ message: 'Error found' });
      res.status(200).json(row);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const deleteBook = (req, res) => {
  try {
    const sql = 'DELETE FROM books WHERE id = ?';

    db.run(sql, [req.params.id], (err, row) => {
      if (err) res.status(300).json({ message: 'Error found' });
      res.status(200).json(row);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

module.exports = {
  addBook,
  getBook,
  deleteBook,
  getAllBooks
};
