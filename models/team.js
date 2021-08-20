const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://images.unsplash.com/photo-1499540633125-484965b60031?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80'
    },
    coach: {
            type: Schema.Types.ObjectId,
            ref: 'User'
    },
    members: [{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
    ],
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    currency: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Team', teamSchema)