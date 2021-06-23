  
const express = require("express");
const User = require("../Models/Users");
const errors = require("restify-errors");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

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


router.post("/login", passport.authenticate("local"), (req, res, next) => {
  console.log("You made it!!");
  const obj = {
    msg: "success",
    user: req.user,
  };
  res.send(obj);
  next();
});

module.exports = router;