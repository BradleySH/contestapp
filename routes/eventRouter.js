const express = require('express')
const Event = require('../models/event')
const eventRouter = express.Router()

eventRouter.route("/")
    .get((req, res, next) => {
        Event.find((err, events) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(events)
        })
    })
    .post((req, res, next) => {
        const newEvent = new Event(req.body)
        newEvent.save((err, savedEvent) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedEvent)
        })
    })

eventRouter.route('/:eventID')
    .delete((req, res, next) => {
        Event.findOneAndDelete({ _id: req.params.eventID }, (err, deletedEvent) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send("Event Deleted")
        })
    })
    .put((req, res, next) => {
        Event.findOneAndUpdate(
            {_id:req.params.eventID}, 
            req.body, 
            {new:true}, 
            (err, updatedEvent) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedEvent)
        })
    })

eventRouter.route('/client/:clientID')
    .get((req, res, next) => {
        Event.find( { client: req.params.clientID}, (err, events) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(events)
        })
    })

module.exports = eventRouter