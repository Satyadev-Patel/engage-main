const express = require("express");
const Event = require("../Models/Event");
const errors = require("restify-errors");
const router = express.Router();

// Endpoint for request of extracting all the events

router.post("/events/", (req, res, next) => {
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }

  try {
    const data = req.body;
    Event.find({ email: data["email"] }).then((event) => {
      const obj = {
        msg: "success",
        event: event,
      };
      res.send(obj);
      next();
    });
  } catch (err) {
    res.render("error/500");
  }
});

// For request to add an event

router.post("/add/", (req, res, next) => {
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }

  try {
    const data = req.body;
    // console.log(data);
    Event.create(data).then(() => {
      res.send(201);
    });
  } catch (err) {
    res.render("error/500");
  }
});

// For request to delete an event

router.post("/delete/", (req, res, next) => {
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }

  try {
    const data = req.body;
    Event.remove(data).then(() => {
      res.send(201);
    });
  } catch (err) {
    res.render("error/500");
  }
});

module.exports = router;
