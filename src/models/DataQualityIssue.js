const mongoose = require("mongoose");

const DataQualityIssueSchema =
new mongoose.Schema({

  source: {
    type: String,
    required: true
  },

  rowNumber: {
    type: Number,
    required: true
  },

  reason: {
    type: String,
    required: true
  },

  raw: {
    type: Object
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports =
mongoose.model(
  "DataQualityIssue",
  DataQualityIssueSchema
);