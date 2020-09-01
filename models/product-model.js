//Product schema
const { Schema,model} = require('mongoose')
const mongoose = require('mongoose')

const productSchema = new Schema ({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    graduation: {
        type: Number,
    },
    price : {
        type: Number,
        required: true
    },
    format: {
        type: Number,
        required: true
    },
    info: {
        type: String
    },
    Provider: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Provider"
    }

})

module.exports = model('Product', productSchema)