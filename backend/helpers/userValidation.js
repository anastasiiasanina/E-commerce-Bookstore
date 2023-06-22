'use strict';

const validateUser = (res, username, password, db, option, callback) => {
  const sql = 'SELECT * FROM users WHERE username = ?';

  db.all(sql, [username], (err, rows) => {
    if (err) res.status(300).json({ message: 'Error found' });
    if (rows.length < 1) {
      if(option == "signup") callback();
      else res.status(300).json({ message: 'User does not exist' });
    } else if (rows.length >= 1) {
      if(option == "signin") callback(password, rows);
      else res.status(300).json({ message: 'User already exists' });
    }
  });
};

module.exports = { validateUser };
