//Recipe schema
const { Schema,model} = require('mongoose')
const mongoose = require('mongoose')


const recipeSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    ingredients: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
            quantity : Number 
    }],
    method : {
        type: String,
        enum: ["Shake", "Stir", "Throw", "Muddle"],
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
     
})

module.exports = model('Recipe', recipeSchema)