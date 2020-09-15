//User schema
const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    name: {
    type: String,
    trim: true,
    required: [true, "Username is a mandatory field"],
    unique: true
  },
    email: {
    type: String,
    required: [true, "Email is a mandatory field"],
    //asegurar formato email desde el servidor
    match: [/^\S+@\S+\.\S+$/, 'Invalid Email format, please check again'],
    unique: true,
    lowercase: true,
    trim: true
  },
    passwordHash: {
    type: String,
    required: [true, "Password is a mandatory fiel"]
  },
  userImgUrl: {
    type: String,
    default: "https://img.favpng.com/24/15/4/computer-icons-avatar-user-profile-blog-png-favpng-9wEFLzf04C5m4ShX8e57uczCy.jpg"
  },
     // Preset login redes
    //googleID: String,
    //facebookID:String,
    //Password property 
})

module.exports = model('User', userSchema)