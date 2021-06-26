  
const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const EventSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  meetName: {
    type: String,
    required: true,
    trim: true,
  },
  meetTime:{
      type: String,
      required: true,
      trim: true,
  },
  day: {
    type: String,
    required: true,
    trim: true,
  },
});

EventSchema.plugin(timestamp);
const event = mongoose.model("Event", EventSchema);
module.exports = event;