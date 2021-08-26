const express = require('express')
const User = require("../models/user")

const userRouter = express.Router()

userRouter.route('/')
    .get((req, res, next) => {
        User.find((err, users) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(req.user.role !== 'admin'){
                res.status(404)
                return next(new Error('Admin Privilege only'))
            }
            const modifiedUsers = users.map(user => user.withoutPassword())
            return res.status(200).send(modifiedUsers)
        })
    })

userRouter.route('/:userID')
    .get((req, res, next) => {
        User.findOne( { _id: req.params.userID }, (err, user) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(user.withoutPassword())
        })
    })

userRouter.route('/client/:clientID')
    .get((req, res, next) => {
        User.find( {client: req.params.clientID}, (err, users) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(users)
        })
    })

module.exports = userRouter