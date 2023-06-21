'use strict';

const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./authors.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) console.error(err);
});

const sql = 'CREATE TABLE authors(ID INTEGER PRIMARY KEY, name)';
db.run(sql);
