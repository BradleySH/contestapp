const express = require('express')
const teamRouter = express.Router()
const Team = require('../models/team')

teamRouter.route('/:clientID')
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

module.exports = teamRouter