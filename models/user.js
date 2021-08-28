const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  role: {
    type: String,
    required: true,
    default: 'general'
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
    type: String,
    default: 'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/'
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref:"Team",
    default: null
  }
});

// pre-save hook to encrypt password on Sign Up
userSchema.pre("save", function(next){
  const user = this
  if(!user.isModified("password")) return next()
  bcrypt.hash(user.password, 10, (err, hash) => {
      if(err) return next(err)
      user.password = hash
      next()
  })
})

// method to check password attempt
userSchema.methods.checkPassword = function(passwordAttempt, callback){
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if(err) return callback(err)
    return callback(null, isMatch)
  })
}

// method to remove user's password for token/sending the response
userSchema.methods.withoutPassword = function(){
  const user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model("User", userSchema);