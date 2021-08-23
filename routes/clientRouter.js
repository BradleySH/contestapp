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
            if(req.user.role !== 'admin'){
                res.status(404)
                return next(new Error('Admin Privilege only'))
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
                if(req.user.role !== 'admin'){
                    res.status(404)
                    return next(new Error('Admin Privilege only'))
                }
                return res.status(201).send(updatedClient)
            }
        )
    })



module.exports = clientRouter