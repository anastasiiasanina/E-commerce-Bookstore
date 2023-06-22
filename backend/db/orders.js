'use strict';

const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./orders.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) console.error(err);
});

const sql = 'CREATE TABLE orders(ID INTEGER PRIMARY KEY, order_number, ' +
  ' username_id, date)';
db.run(sql);
