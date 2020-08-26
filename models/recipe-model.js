//Recipe schema
const { Schema,model, Mongoose} = require('mongoose')
const mongoose = require('mongoose')
const Product = require("./product-model")

const recipeSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    ingredients: {
        type: Array,
        default: []
    },
    method : {
        type: String,
        enum: ["Shake", "Stir", "Throw", "Muddle"],
        default: ""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
     ingredientId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Product"
     } 

})

module.exports = model('Recipe', recipeSchema)