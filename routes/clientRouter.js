const express = require('express')
const Client = require('../models/client')

const clientRouter = express.Router()

    // Create/Get Client/s
clientRouter.route('/')
    .get((req, res, next) => {
        Client.find((err, clients) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(clients)
        })
    })
    .post((req, res, next) => {
        const newClient = new Client(req.body)
        newClient.save((err, savedClient) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedClient)
        })
    })

    // Edit/Delete Client 
clientRouter.route('/:clientID')
    .delete((req, res, next) => {
        Client.findOneAndDelete( { _id: req.params.clientID }, (err, deletedClient) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Client: ${deletedClient.name} was removed `)
        })
    })
    .put((req, res, next) => {
        Client.findOneAndUpdate(
            {_id: req.params.clientID},
            req.body,
            {new: true},
            (err, updatedClient) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedClient)
            }
        )
    })

    // Add Team to Client
clientRouter.route('/:clientID/team')
    .post((req, res, next) => {
        const newTeam = req.body
        Client.findOneAndUpdate(
            { _id: req.params.clientID }, 
            { $addToSet: {
                teams: newTeam
            }},
            { new: true },
            (err, client) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(!client){
                res.status(404)
                return next(new Error('No Client was found with that ID'))
            }
            return res.status(201).send(client)
        })
    })

    // Add Member to Team
clientRouter.route('/:clientID/team/:teamID')
    .post((req, res, next) => {
        const newMember = req.body
        console.log(req.body)
        Client.findOneAndUpdate(
            { _id: req.params.clientID,
                'teams._id': req.params.teamID
            }, 
            { $addToSet: {
                'teams.$.members': newMember
            }},
            { new: true },
            (err, client) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(!client){
                res.status(404)
                return next(new Error('No Client was found with that ID'))
            }
            return res.status(201).send(client)
        })
    })

    
    // Add Event
clientRouter.route('/:clientID/event')
    .post((req, res, next) => {
        const newEvent = req.body
        Client.findOneAndUpdate(
            { _id: req.params.clientID }, 
            { $addToSet: {
                events: newEvent
            }},
            { new: true },
            (err, client) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(!client){
                res.status(404)
                return next(new Error('No Client was found with that ID'))
            }
            return res.status(201).send(client)
        })
})

    // Add team to be referenced and populated
clientRouter.route('/:clientID/event/:eventID/team')
    .post((req, res, next) => {
        const newTeam = req.body
        console.log(req.body)
        Client.findOneAndUpdate(
            { _id: req.params.clientID,
                'events._id': req.params.eventID
            }, 
            { $addToSet: {
                'events.$.teams': newTeam
            }},
            { new: true },
            (err, client) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(!client){
                res.status(404)
                return next(new Error('No Client was found with that ID'))
            }
            return res.status(201).send(client)
        })
    })

    // Add Contest
clientRouter.route('/:clientID/contest')
    .post((req, res, next) => {
        const newContest = req.body
        Client.findOneAndUpdate(
            { _id: req.params.clientID }, 
            { $addToSet: {
                contests: newContest
            }},
            { new: true },
            (err, client) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(!client){
                res.status(404)
                return next(new Error('No Client was found with that ID'))
            }
            return res.status(201).send(client)
        })
})

    // Add team to be referenced and populated
clientRouter.route('/:clientID/contest/:contestID/team')
.post((req, res, next) => {
    const newTeam = req.body
    Client.findOneAndUpdate(
        { _id: req.params.clientID,
            'contests._id': req.params.contestID
        }, 
        { $addToSet: {
            'contests.$.teams': newTeam
        }},
        { new: true },
        (err, client) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!client){
            res.status(404)
            return next(new Error('No Client was found with that ID'))
        }
        return res.status(201).send(client)
    })
})

module.exports = clientRouter