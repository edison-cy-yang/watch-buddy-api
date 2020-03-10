const express = require('express');
const router  = express.Router();

const relationshipsFn = require("../databaseHelpers/relationshipsFn");

module.exports = (db) => {

  router.post("/", async (req, res) => {
    const currentUserId = req.body.currentUserId;
    const friendId = req.body.friendId;
    try {
      const relationship = await relationshipsFn.sendFriendRequest(db, currentUserId, friendId);
      res.json(relationship);
    } catch(err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/:id/accept", async (req, res) => {
    const currentUserId = req.body.currentUserId;
    const friendId = req.body.friendId;
    const relationshipId = req.params.id;
    try {
      await relationshipsFn.acceptFriendRequest(db, relationshipId, currentUserId, friendId);
      res.json({success: "yez"});
    } catch(err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
