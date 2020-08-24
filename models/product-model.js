//Product schema
const { Schema,model, Mongoose} = require('mongoose')
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
        type: String,
    },
    info: {
        type: String
    },
    idprovider: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Provider"
    }

})

module.exports = model('Product', productSchema)