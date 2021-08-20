const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    commissioner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    access: {
        type: String,
        required: true
    },
    teams: [
        {
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
                    ref: 'User',
                    required: true
            },
            members: [
                {
                    _id: {
                        type: Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
                    }
                }
            ],
            points: Number,
            currency: Number
        }
    ],
    events: [
        {
            title: {
                type: String,
            required: true
            },
            eventDate: {
                type: Date,
                required: true
            },
            teams: [
                {
                    _id: {
                        type: Schema.Types.ObjectId,
                        ref: 'Team',
                        required: true
                    }
                }
            ],
            challenges: [
                {
                    title: {
                        type: String,
                        required: true
                    },
                    firstPrize: {
                        type: Number,
                        required: true
                    },
                    secondPrize: {
                        type: Number,
                        required: true
                    },
                    thirdPrize: {
                        type: Number,
                        required: true
                    },
                    firstPlace: String,
                    secondPlace: String,
                    thirdPlace: String
                }
            ]
        }
    ],
    contests:[
        {
            title: {
                type: String,
                required: true
            },
            contestDate: {
                type: Date,
                required: true
            },
            teams: [
                {
                    _id: {
                        type: Schema.Types.ObjectId,
                        ref: 'Team',
                        required: true
                    }
                }
            ],
            challenges: [
                {
                    title: {
                        type: String,
                        required: true
                    },
                    firstPrize: {
                        type: Number,
                        required: true
                    },
                    secondPrize: {
                        type: Number,
                        required: true
                    },
                    thirdPrize: {
                        type: Number,
                        required: true
                    },
                    firstPlace: String,
                    secondPlace: String,
                    thirdPlace: String
                }
            ]
        }
    ]
})

module.exports = mongoose.model('Client', clientSchema)