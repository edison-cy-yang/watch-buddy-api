const addNewUser = (db, user) => {
  let queryParams = [user.name, user.email, user.googleId];
  let queryString = `
    INSERT INTO users (name, email, googleId)
    VALUES ($1, $2, $3)
    RETURNING *;
  `
  return db.query(queryString, queryParams).then(res => {
    return res.rows[0];
  });
}
exports.addNewUser = addNewUser;
