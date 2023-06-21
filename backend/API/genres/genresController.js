'use strict';

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(
  './db/genres.db',
  sqlite.OPEN_READWRITE, (err) => {
    if (err) console.log(err);
  });
let sql;

const addGenre = (req, res) => {
  try {
    const { name } = req.body;
    sql = 'INSERT INTO books(name) VALUES (?)';
    db.run(sql, [name], (err) => {
      if (err) res.status(300).json({ message: 'Error found' });
      console.log('success: ', name);
    });

    res.status(201).json('Created');
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const getAllGenres = (req, res) => {
  try {
    sql = 'SELECT * FROM genres';
    db.all(sql, [], (err, rows) => {
      if (err) res.status(300).json({ message: 'Error found' });
      if (rows.length < 1) res.status(300).json({ message: 'No match' });

      res.status(200).json(rows);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const getGenre = (req, res) => {
  try {
    const sql = 'SELECT * FROM genres WHERE id = ?';

    db.each(sql, [req.params.id], (err, row) => {
      if (err) res.status(300).json({ message: 'Error found' });
      res.status(200).json(row);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const deleteGenre = (req, res) => {
  try {
    const sql = 'DELETE FROM genres WHERE id = ?';

    db.run(sql, [req.params.id], (err, row) => {
      if (err) res.status(300).json({ message: 'Error found' });
      res.status(200).json(row);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

module.exports = {
  addGenre,
  getGenre,
  deleteGenre,
  getAllGenres
};
