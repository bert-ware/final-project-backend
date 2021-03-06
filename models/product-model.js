//Product schema
const { Schema,model} = require('mongoose')
const mongoose = require('mongoose')

const productSchema = new Schema ({

    name: {
        type: String,
        trim: true,
        required: [true, "Name is a mandatory field"],
    },
    price : {
        type: Number,
        required: [true, "Price is a mandatory field"]
    },
    typeFormat: {
        type : String,
        enum : ["Grams", "Centiliters"],
        required: [true, "Format is a mandatory field"]
    },
    format: {
        type: Number,
        required: [true, "Format is a mandatory field"]
    },     
    info: {
        type: String
    },
    Provider: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Provider",
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    imgUrl: {
        type: String,
        default: "https://images.clipartlogo.com/files/istock/previews/1846/18463337-liquor-bottle.jpg"
      } 

})

module.exports = model('Product', productSchema)