const sendFriendRequest = (db, currentUserId, friendId) => {
  let queryParams = [currentUserId, friendId];
  let queryString = `
    INSERT INTO relationships (user_one, user_two, status)
    VALUES ($1, $2, 0)
    RETURNING *;
  `;
  return db.query(queryString, queryParams).then(res => {
    return res.rows[0];
  });
};

exports.sendFriendRequest = sendFriendRequest;

const acceptFriendRequest = (db, relationshipId, currentUserId, friendId) => {
  let queryParams = [relationshipId];
  let queryString = `
    UPDATE relationships
    SET status = 1
    WHERE id = $1
    RETURNING *;
  `;
  return db.query(queryString, queryParams).then(res => {
    queryParams = [currentUserId, friendId];
    queryString = `
      INSERT INTO relationships (user_one, user_two, status)
      VALUES ($1, $2, 1)
      RETURNING *;
    `;
    return db.query(queryString, queryParams).then(res => {
      return res.rows[0];
    });
  });
}

exports.acceptFriendRequest = acceptFriendRequest;
