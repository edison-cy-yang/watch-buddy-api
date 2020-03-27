const getAllRoomsByFriends = (db, id) => {
  let queryParams = [id];
  let queryString = `
    SELECT rooms.*, users.name
    FROM relationships
    JOIN rooms ON relationships.user_two = rooms.owner_id
    JOIN users ON rooms.owner_id = users.id
    where relationships.user_one = $1 AND relationships.status = 1
    ORDER BY users.id;
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

const addRoom = (db, room, owner_id) => {
  let queryParams = [room.uid, room.title, room.video_url, owner_id];
  let queryString = `
    INSERT INTO rooms (uid, title, video_url, owner_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  return db.query(queryString, queryParams).then(res => {
    return res.rows[0];
  });
};

exports.addRoom = addRoom;

const editRoom = (db, room, id) => {
  let queryParams = [room.title, room.video_url, id];
  let queryString = `
    UPDATE rooms
    SET title = $1, video_url = $2
    WHERE id = $3
    RETURNING *;
  `;
  return db.query(queryString, queryParams).then(res => {
    return res.rows[0];
  });
};

exports.editRoom = editRoom;

const getRoomByUid = (db, uid) => {
  let queryParams = [uid];
  let queryString = `
    SELECT *
    FROM rooms
    WHERE uid = $1;
  `;
  return db.query(queryString, queryParams).then(res => {
    return res.rows[0];
  });
};

exports.getRoomByUid = getRoomByUid;
