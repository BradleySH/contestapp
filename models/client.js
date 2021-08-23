const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    commissioner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    access: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 6
    }
})

module.exports = mongoose.model('Client', clientSchema)