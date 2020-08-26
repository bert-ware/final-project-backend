//Provider Schema
const { Schema, model, Mongoose } = require("mongoose")
const mongoose = require('mongoose')

const providerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  adress: {
    street: {
      type: String,
      trim: true,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    }
  },
  telephone: {
    type: Number,
    required: true,
  },
  info: {
    type: String,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
} 
});

module.exports = model("Provider", providerSchema);
