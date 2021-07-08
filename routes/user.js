const express = require("express");
const User = require("../Models/Users");
const Meeting = require("../Models/Meetings");
const errors = require("restify-errors");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const dotnev = require("dotenv");

// Load Config
dotnev.config({ path: "../config/config.env" });

// for sending email
const send = require("gmail-send")({
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
});

// for request of registering a user

router.post("/register", (req, res, next) => {
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }
  try {
    const data = req.body;
    User.findOne({ email: data["email"] }).then((user) => {
      if (user) {
        res.send("Email already registred!!");
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(data["password"], salt, (err, hash) => {
            if (err) throw err;
            data["password"] = hash;
            User.create(data).then(() => {
              res.send(201);
            });
          });
        });
      }
    });
  } catch (err) {
    res.render("error/500");
  }
});

// request to send an email to particular user

router.post("/send_mail", (req, res, next) => {
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }

  try {
    const data = req.body;
    send({
      // Overriding default parameters
      to: data["email"],
      subject: "Room Invitation",
      text: `You have been invited to ${data["name"]}'s room.\n Room id : ${data["text"]}\n 
            App link: https://polar-journey-62609.herokuapp.com/ \n You will need to login first and then Enter this ID in JOIN or CREATE MEETING`,
    })
      .then((result, full) => {
        const obj = {
          msg: "Email Sent",
        };
        res.send(obj);
        next();
      })
      .catch((error) => {
        const obj = {
          msg: "Invalid Email Address",
        };
        res.send(obj);
        next();
      });
  } catch (err) {
    res.render("error/500");
  }
});

// Request to extract all the meeting details for a particular user

router.post("/meetings", (req, res, next) => {
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }
  try {
    const data = req.body;
    Meeting.find({ email: data["email"] }).then((meeting) => {
      const obj = {
        msg: "success",
        meetings: meeting,
      };
      res.send(obj);
      next();
    });
  } catch (err) {
    res.render("error/500");
  }
});

// Endpoint for request of checking whether a meeting exists or not for a user

router.post("/find_id", (req, res, next) => {
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }
  try {
    const data = req.body;
    // One user can't create multiple meetings with same name
    Meeting.find({ email: data["email"], meetName: data["room"] }).then(
      (meeting) => {
        if (meeting.length > 0) {
          const obj = {
            msg: "fail",
            meetings: meeting,
          };
          res.send(obj);
          next();
        } else {
          const obj = {
            msg: "success",
            meetings: meeting,
          };
          res.send(obj);
          next();
        }
      }
    );
  } catch (err) {
    res.render("error/500");
  }
});

// Checking whether a roomID exists or not on the server

router.post("/find_join_id", (req, res, next) => {
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }
  try {
    const data = req.body;
    Meeting.find({ meetID: data["roomID"] }).then((meeting) => {
      if (meeting.length === 0) {
        const obj = {
          msg: "fail",
          name: "null",
        };
        res.send(obj);
        next();
      } else {
        const obj = {
          msg: "success",
          name: meeting[0]["meetName"],
        };
        res.send(obj);
        next();
      }
    });
  } catch (err) {
    res.render("error/500");
  }
});

// Delete a meeting from the user's database

router.post("/delete_meet", (req, res, next) => {
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }

  try {
    const data = req.body;
    Meeting.deleteOne(data).then(() => {
      res.send(201);
    });
  } catch (err) {
    res.render("error/500");
  }
});

// Authenticating the user using passport

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const obj = {
    msg: "success",
    user: req.user,
  };
  res.send(obj);
  next();
});

module.exports = router;
