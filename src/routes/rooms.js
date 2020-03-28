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

  //get a single room
  router.get("/:id", async (req, res) => {
    const roomId = req.params.id;
    try {
      const room = await roomsFn.getRoomById(db, roomId);
      res.json(room);
    } catch(err) {
      res.status(404).json({ error: err.message });
    }
  });

  //get a single room by uid
  router.get("/uid/:uid", async (req, res) => {
    const uid = req.params.uid;
    try {
      const room = await roomsFn.getRoomByUid(db, uid);
      res.json(room);
    } catch(err) {
      res.status(404).json({ error: err.message });
    }
  });

  //Create a new room
  router.post("/", async (req, res) => {
    const room = req.body.room;
    const owner_id = req.body.owner_id;
    try {
      const newRoom = await roomsFn.addRoom(db, room, owner_id);
      res.json(newRoom);
    } catch(err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/:id", async (req, res) => {
    const room = req.body.room;
    const id = req.params.id;
    try {
      const modifiedRoom = await roomsFn.editRoom(db, room, id);
      res.json(modifiedRoom);
    } catch(err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router
}
