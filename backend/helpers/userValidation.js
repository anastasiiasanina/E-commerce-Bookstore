'use strict';

const validateUser = (res, username, password, db, option, callback) => {
  const sql = 'SELECT * FROM users WHERE username = ?';

  db.all(sql, [username], (err, rows) => {
    if (err) {
      res.status(300).json({ message: 'Error found' });
      return;
    }

    if (option === 'signup') {
      if (rows.length < 1) callback();
      else res.status(300).json({ message: 'User already exists' });
    } else if (option === 'signin') {
      if (rows.length >= 1) callback(password, rows);
      else res.status(300).json({ message: 'User does not exist' });
    }
  });
};

module.exports = { validateUser };
