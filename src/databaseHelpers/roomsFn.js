const getAllRoomsByFriends = (db, id) => {
  let queryParams = [id];
  let queryString = `
    SELECT rooms.*
    FROM relationships
    JOIN rooms ON relationships.user_two = rooms.owner_id
    where relationships.user_one = $1 AND relationships.status = 1;
  `;
  return db.query(queryString, queryParams).then(res => {
    return res.rows;
  });
}

exports.getAllRoomsByFriends = getAllRoomsByFriends;
