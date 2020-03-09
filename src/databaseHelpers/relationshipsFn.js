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
