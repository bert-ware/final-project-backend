//Provider Schema
const { Schema, model, Mongoose } = require("mongoose")
const mongoose = require('mongoose')
const User = require("../models/user-model")

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
},
  providerImgUrl: {
  type: String,
  default: "https://images.clipartlogo.com/files/istock/previews/8063/80633763-delivery-man-with-water-vector-illustration.jpg"
} 
})

module.exports = model("Provider", providerSchema);
