'use strict';

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(
  './db/orders.db',
  sqlite.OPEN_READWRITE, (err) => {
    if (err) console.error(err);
  });
let sql;

const addOrder = (req, res) => {
  try {
    const { orderNumber, usernameId, date } = req.body;
    sql = 'INSERT INTO orders(order_number, username_id, date)' +
      ' VALUES (?,?,?,?,?,?)';
    db.run(sql, [orderNumber, usernameId, date], (err) => {
      if (err) res.status(300).json({ message: 'Error found' });
    });

    res.status(201).json('Created');
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const getAllOrders = (req, res) => {
  try {
    sql = 'SELECT * FROM orders';
    db.all(sql, [], (err, rows) => {
      if (err) res.status(300).json({ message: 'Error found' });
      if (rows.length < 1) res.status(300).json({ message: 'No match' });

      res.status(200).json(rows);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const getOrder = (req, res) => {
  try {
    const sql = 'SELECT * FROM orders WHERE id = ?';

    db.each(sql, [req.params.id], (err, row) => {
      if (err) res.status(300).json({ message: 'Error found' });
      res.status(200).json(row);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

const deleteOrder = (req, res) => {
  try {
    const sql = 'DELETE FROM orders WHERE id = ?';

    db.run(sql, [req.params.id], (err, row) => {
      if (err) res.status(300).json({ message: 'Error found' });
      res.status(200).json(row);
    });
  } catch (error) {
    res.status(400).json({ message: 'Error found' });
  }
};

module.exports = {
  addOrder,
  getOrder,
  deleteOrder,
  getAllOrders
};
