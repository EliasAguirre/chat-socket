const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatSchema = new Schema({
  nick: String,
  msg: String,
  date_Created: {
    type: Date,
    default: Date.now
  }
});

//Have to export our Schema
module.exports = mongoose.model('Chat', ChatSchema);

//need to export all this to sockets
