const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const ChatSchema = new mongoose.Schema({
  meetID: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: false,
    trim: true,
  },
  handle: {
    type: String,
    required: true,
    trim: true,
  },
});

ChatSchema.plugin(timestamp);
const chat = mongoose.model("Chat", ChatSchema);
module.exports = chat;
