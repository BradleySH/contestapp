const express = require('express')
const Client = require('../models/client')
const Team = require('../models/team')
const User = require('../models/user')

const clientRouter = express.Router()

    // Create/Get Client/s
clientRouter.route('/')
    .get((req, res, next) => {
        Client.find((err, clients) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(req.user.role !== 'admin'){
                res.status(404)
                return next(new Error('Admin Privilege only'))
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
            if(req.user.role !== 'admin'){
                res.status(404)
                return next(new Error('Admin Privilege only'))
            }
            if(savedClient.commissioner){
                User.findOneAndUpdate(
                    { _id: savedClient.commissioner},
                    { role: 'commissioner'},
                    { new: true },
                    (err, updatedUser) => {
                        if(err){
                            res.status(500)
                            return next(err)
                        }
                        return res.status(201).send(`${updatedUser.firstName} ${updatedUser.lastName} has been set as the commissioner of ${savedClient.name}`)
                    }
                )}
            return res.status(201).send(savedClient)
        })
    })

    // Edit/Delete Client 
clientRouter.route('/:clientID')
    .get((req, res, next) => {
        Client.findOne( {_id: req.params.clientID}, (err, client) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(client)
        })
    })
    .delete((req, res, next) => {
        User.deleteMany( {client: req.params.clientID}, (err, deletedUsers) => {
            if(err){
                res.status(500)
                return next(err)
            }
            console.log('All users were terminated from client')
        })
        Team.deleteMany( { client: req.params.clientID }, (err, deletedTeams) => {
            if(err){
                res.status(500)
                return next(err)
            }
            console.log("All teams were terminated from client")
        })
        Client.findOneAndDelete( {_id: req.params.clientID }, ( err, deletedClient ) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Client: ${deletedClient.name}, was terminated from the database`)
        })
    })
    .put((req, res, next) => {
        Client.findOne( {_id: req.params.clientID}, (err, client) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(req.user.role !== 'admin'){
                res.status(404)
                return next(new Error('Admin Privilege only'))
            }
            if(client.commissioner){
                User.findOneAndUpdate(
                    { _id: client.commissioner},
                    { role: 'general'},
                    { new: true },
                    (err, user) => {
                        if(err){
                            res.status(500)
                            return next(err)
                        }
                        console.log(`${user.firstName} ${user.lastName} has been set as a general user of ${client.name}`)
                    }
                )
            }
            Client.findOneAndUpdate(
                {_id: req.params.clientID},
                req.body,
                {new: true},
                (err, updatedClient) => {
                    if(err){
                        res.status(500)
                        return next(err)
                    }
                    if(updatedClient.commissioner){
                        User.findOneAndUpdate(
                            { _id: updatedClient.commissioner},
                            { role: 'commissioner'},
                            { new: true },
                            (err, updatedUser) => {
                                if(err){
                                    res.status(500)
                                    return next(err)
                                }
                                console.log(`${updatedUser.firstName} ${updatedUser.lastName} has been set as the commissioner of ${updatedClient.name}`)
                            }
                        )
                    }
                }
            )
        })
    })



module.exports = clientRouter