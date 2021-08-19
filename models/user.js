const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: true
  },
  lastName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  currency: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    
    team: {
      type: Schema.Types.ObjectId,
      ref:"Team"
    }
  }
});

module.exports = mongoose.model("User", userSchema);