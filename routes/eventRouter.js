const express = require('express')
const Event = require('../models/event')
const eventRouter = express.Router()

eventRouter.route('/:clientID')
    .get((req, res, next) => {
        Event.find( { client: req.params.clientID}, (err, events) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(events)
        })
    })
    .post((req, res, next) => {
        req.body.client = req.params.clientID
        const newEvent = new Event(req.body)
        newEvent.save((err, savedEvent) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedEvent)
        })
    })

module.exports = eventRouter