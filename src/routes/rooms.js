const express = require('express');
const router  = express.Router();

const roomsFn = require('../databaseHelpers/roomsFn');

module.exports = (db) => {

  // get a list of rooms that my friends have
  router.get("/", async (req, res) => {
    const id = req.query.id;
    try {
      const rooms = await roomsFn.getAllRoomsByFriends(db, id);
      res.json(rooms);
    } catch(err) {
      res.status(404).json({ error: err.message });
    }
  });

  return router
}
