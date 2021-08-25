const express = require('express')
const teamRouter = express.Router()
const Team = require('../models/team')
const User = require('../models/user')

teamRouter.route('/client/:clientID')
    .get((req, res, next) => {
        Team.find( { client: req.params.clientID}, (err, teams) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(teams)
        })
    })
    .post((req, res, next) => {
        req.body.client = req.params.clientID
        const newTeam = new Team(req.body)
        newTeam.save((err, savedTeam) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedTeam)
        })
    })

teamRouter.route('/:teamID/member')
    .get((req, res, next) => {
        User.find( { team: req.params.teamID }, (err, users) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const modifiedUsers = users.map(user => user.withoutPassword())
            return res.status(200).send(modifiedUsers)
        })
    })

teamRouter.route('/:teamID')
    .delete((req, res, next) => {
        Team.findOneAndDelete( { _id: req.params.teamID}, (err, team) => {
            if(err){
                res.status(500)
                return next(err)
            }
        })
    })
    .put((req, res, next) => {
        Team.findOneAndUpdate( { _id: req.params.teamID }, (err, team) => {
            if(err){
                res.status(500)
                return next(err)
            }
        })
    })

module.exports = teamRouter