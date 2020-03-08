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
};

exports.getAllRoomsByFriends = getAllRoomsByFriends;

const getRoomById = (db, roomId) => {
  let queryParams = [roomId];
  let queryString = `
    SELECT *
    FROM rooms
    WHERE id = $1;
  `;
  return db.query(queryString, queryParams).then(res => {
    return res.rows[0];
  });
};

exports.getRoomById = getRoomById;
