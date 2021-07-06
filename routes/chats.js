const express = require("express");
const Chat = require("../Models/Chat");
const errors = require("restify-errors");
const router = express.Router();

router.post("/chat_data/", (req, res, next) => {
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }
  try {
    const data = req.body;
    Chat.find({ meetID: data["roomID"] }).then((chat) => {
      const obj = {
        msg: "success",
        allChats: chat,
      };
      res.send(obj);
      next();
    });
  } catch (err) {
    res.render("error/500");
  }
});

module.exports = router;
