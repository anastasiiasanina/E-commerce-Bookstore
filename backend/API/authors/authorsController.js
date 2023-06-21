'use strict';

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(
  './db/authors.db',
  sqlite.OPEN_READWRITE,
  (err) => {
    if (err) console.log(err);
  }
);
let sql;

const addAuthor = (req, res) => {
  try {
    const { name } = req.body;
    sql = 'INSERT INTO authors(name) VALUES (?)';
    db.run(sql, [name], (err) => {
      if (err) res.status(300).json({ message: 'Error found' });
      console.log('success: ', name);
    });

    res.status(201).json('Created');
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const getAuthor = (req, res) => {
  try {
    const sql = `SELECT * FROM authors WHERE id = ${req.params.id}`;

    db.each(sql, [], (err, row) => {
      if (err) res.status(300).json({ message: 'Error found' });
      res.status(200).json(row);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const getAllAuthors = (req, res) => {
  try {
    sql = 'SELECT * FROM authors';
    db.all(sql, [], (err, rows) => {
      if (err) res.status(300).json({ message: 'Error found' });
      if (rows.length < 1) res.status(300).json({ message: 'No match' });

      res.status(200).json(rows);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const deleteAuthor = (req, res) => {
  try {
    const sql = `DELETE FROM authors WHERE id = ${req.params.id}`;

    db.run(sql, [], (err, row) => {
      if (err) res.status(300).json({ message: 'Error found' });
      res.status(200).json(row);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

module.exports = {
  addAuthor,
  getAuthor,
  deleteAuthor,
  getAllAuthors
};
