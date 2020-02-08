const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  company_name: {
    type: String
  },
  event_name: {
    type: String,
    required: true
  },

  vendor_name: {
    type: String
  },
  proposed_dates: {
    type: [Date],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  remarks: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      }
    }
  ],
  confirmed_date: {
    type: Date,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }
});

function arrayLimit(val) {
  return val.length <= 3;
}

module.exports = Event = mongoose.model("event", EventSchema);
