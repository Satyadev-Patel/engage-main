const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

// Database to store user's past meetings

const MeetingSchema = new mongoose.Schema({
  meetName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  meetID: {
    type: String,
    required: true,
    trim: true,
  },
});

MeetingSchema.plugin(timestamp);
const meetings = mongoose.model("Meetings", MeetingSchema);
module.exports = meetings;
