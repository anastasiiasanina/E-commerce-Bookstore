'use strict';

const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./users.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) console.error(err);
});

const sql = 'CREATE TABLE users(ID INTEGER PRIMARY KEY, username, password)';
db.run(sql);
