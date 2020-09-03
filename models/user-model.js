//User schema
const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    name: {
    type: String,
    trim: true,
    required: [true, "El nombre de usuario es requerido :) ."],
    unique: true
  },
    email: {
    type: String,
    required: [true, "El email es requerido :) ."],
    //asegurar formato email desde el servidor
    match: [/^\S+@\S+\.\S+$/, 'Dirección de correo inválida, revise su dirección de correo :) .'],
    unique: true,
    lowercase: true,
    trim: true
  },
    // Preset login redes
    //googleID: String,
    //facebookID:String,
    //Password property 
    passwordHash: {
    type: String,
    required: [true, "La contraseña es un campo requerido :) ."]
  },
  userImgUrl: {
    type: String,
    default: "https://img.favpng.com/24/15/4/computer-icons-avatar-user-profile-blog-png-favpng-9wEFLzf04C5m4ShX8e57uczCy.jpg"
  }
})

module.exports = model('User', userSchema)