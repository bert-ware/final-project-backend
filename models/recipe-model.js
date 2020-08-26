//Recipe schema
const { Schema,model, Mongoose} = require('mongoose')
const mongoose = require('mongoose')


const recipeSchema = new Schema ({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    ingredients: [],
    method : {
        enum: ["Shake", "Stir", "Throw", "Muddle"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }

})

module.exports = model('Recipe', recipeSchema)