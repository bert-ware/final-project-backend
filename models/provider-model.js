//Provider Schema
const { Schema, model, Mongoose } = require("mongoose")
const mongoose = require('mongoose')
const User = require("../models/user-model")

const providerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is a mandatory field"],
    unique: [true, "Name already in use"]
  },
  adress: {
    street: {
      type: String,
      trim: true,
      required: [true, "Please provide an adress"]
    },
    number: {
      type: Number,
    }
  },
  telephone: {
    type: Number,
    required: true,
    match :[/^((\+)?)([\s-.\(\)]*\d{1}){8,13}$/, "Invalid phone format"]
  },
  info: {
    type: String,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
  providerImgUrl: {
  type: String,
  default: "https://images.clipartlogo.com/files/istock/previews/8063/80633763-delivery-man-with-water-vector-illustration.jpg"
} 
})

module.exports = model("Provider", providerSchema);
