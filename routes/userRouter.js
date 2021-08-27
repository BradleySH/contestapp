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
            const modifiedUsers = users.map(user => user.withoutPassword())
            return res.status(200).send(modifiedUsers)
        })
    })

userRouter.route('/team/:teamID')
    .get((req, res, next) => {
        User.find( {team: req.params.teamID }, (err, users) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const modifiedUsers = users.map(user => user.withoutPassword())
            return res.status(200).send(modifiedUsers)
        })
    })
    .put((req, res, next) => {
        console.log(req.body)
        const updatedMembers = req.body.members.map(memberID => {
            User.findOneAndUpdate( 
                { _id: memberID},
                { team: req.params.teamID },
                { new: true},
                (err, updatedMember) => {
                    if(err){
                        res.status(500)
                        return next(err)
                    }
                    return updatedMember
                }
            )
        })
        const modifiedUsers = updatedMembers.map(user => user.withoutPassword())
        return res.status(201).send(modifiedUsers)
    })

module.exports = userRouter