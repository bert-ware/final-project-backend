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
            quantity : {
                type: Number,
                required: true
            }
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
    recipeImgUrl: {
        type: String,
        default: "https://i.pinimg.com/originals/8b/8b/96/8b8b96ac1e356809ea9ccdd1d3232304.jpg  "
      }, 
})

module.exports = model('Recipe', recipeSchema)