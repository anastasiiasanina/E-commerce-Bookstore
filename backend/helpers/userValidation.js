'use strict';

const validateUser = (res, username, db, insertUser) => {
  const sql = 'SELECT * FROM users WHERE username = ?';

  db.all(sql, [username], (err, rows) => {
    if (err) res.status(300).json({ message: 'Error found' });
    if (rows.length < 1) {
      insertUser();
    } else if (rows.length >= 1) {
      res.status(300).json({ message: 'User with this username exists' });
    }
  });
};

module.exports = { validateUser };
