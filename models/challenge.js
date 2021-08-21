const mongoose = require('mongoose')
const Schema = mongoose.Schema

const challengeSchema = new Schema({
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
})

module.exports = mongoose.model('Challenge', challengeSchema)