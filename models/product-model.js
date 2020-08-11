//Product schema
const { Schema,model, Mongoose} = require('mongoose')

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
        //podemos hacer opciones
    },
    info: {
        type: String
    },
    idprovider: {
        type: Mongoose.Schema.Types.ObjectID,
        ref: "Provider"
    }

})

module.exports = model('Product', productSchema)