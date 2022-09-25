const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  siteNumber: Number,
  wave: String,
  observed: {
    type: [{
      date: String, 
      cfs: Number,
      ft: Number
    }],
    required: true
  },
  forecast: {
    type: [{
      date: String,
      cfs: Number,
      ft: Number
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", ReportSchema);