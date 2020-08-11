//Provider Schema
const { Schema,model} = require('mongoose')

const providerSchema = new Schema({

            name: {
                type: String,
                trim: true,
                required: true,
                unique: true
            },
            adress: {   
                street: {
                type: String,
                trim: true,
                required: true
                }},
            number: {
                type: Number,
                required: true
                  }, 
            telephone: {
                type: Number,
                required: true
                 },
            info : {
                type: String
            }               
            })

            module.exports = model('Provider', providerSchema)