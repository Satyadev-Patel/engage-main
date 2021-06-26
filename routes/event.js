  
const express = require("express");
const Event = require("../Models/Event");
const errors = require("restify-errors");
const router = express.Router();

router.post("/events/", (req, res, next) => {
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }

  try {
    const data = req.body;
    Event.find({ email: data["email"]}).then((event) => {
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

router.post("/delete/", (req, res, next) => {
    
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }
  
  try {
    const data = req.body;
    Event.deleteOne(data).then(() => {
        res.send(201);
    });
  } catch (err) {
    res.render("error/500");
  }
});




module.exports = router;