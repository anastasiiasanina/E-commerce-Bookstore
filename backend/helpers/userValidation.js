const validateUser = (username, db) => {
  const sql = 'SELECT * ' + 'FROM users ' + `WHERE username = ${username}`;
    
  db.each(sql, [], (err, row) => {
    if(err) console.log(err);
    else if(row.length > 0 ) return true;
    else return false;
  });
}

module.exports = {validateUser}