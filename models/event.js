const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    teams: [{
            type: Schema.Types.ObjectId,
            ref: 'Team'
        }],
    challenges: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Challenge'
        }
    ],
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema)