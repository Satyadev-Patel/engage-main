  
const express = require("express");
const User = require("../Models/Users");
const errors = require("restify-errors");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const credentials = {user:"dsemo1122@gmail.com", pass:"guru@3003"};
const send = require('gmail-send')({
  //const send = require('../index.js')({
  user: credentials.user,
  pass: credentials.pass,  
});
const sendMail = () => {
  console.log("Success");
  
}


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

router.post("/send_mail", (req, res, next) => {
  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }
 
  try {
    const data = req.body;
    console.log(data);
    send({ // Overriding default parameters
      to: data["email"],
      subject:"Room Invitation",
      text: `You have been invited to ${data["name"]}'s room.\n Room id : ${data["text"]}\n 
            App link: http://localhost:3000/`
    }, function (err, res, full) {
      if (err) return console.log('* [example 1.1] send() callback returned: err:', err);
      console.log('* [example 1.1] send() callback returned: res:', res);
    }); 
    const obj = {
      msg: "success",
    };
    res.send(obj);
    next();
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