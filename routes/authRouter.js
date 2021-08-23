const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");


// Sign Up

authRouter.post("/signup", (req, res, next) => {
  User.findOne( { email: req.body.email.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(req.body.password.length < 5){
      res.status(403)
      return next(new Error("Password needs to be five characters or longer"))
    }
    if(user){
      res.status(403)
      return next(new Error("Email is already taken"))
    }
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if(err) {
        res.status(500)
        return next(500)
      }
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
      return res.status(201).send( {token, user: savedUser.withoutPassword()} )
    })
  })
});

// Login

authRouter.post("/login", (req, res, next) => {
  User.findOne( { email: req.body.email.toLowerCase() }, (err, user) => {
    if(err){
        res.status(500)
        return next(err)
    }
    if(!user){
        res.status(403)
        return next(new Error('Email or Password are incorrect'))
    }
    user.checkPassword(req.body.password, (err, isMatch) => {
        if(err){
            res.status(403)
            return next(new Error('Email or Password are incorrect'))
        }
        if(!isMatch){
            res.status(403)
            return next(new Error('Email or Password are incorrect'))
        }
        const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
        return res.status(200).send({token, user: user.withoutPassword()})
    })
})
})

module.exports = authRouter
