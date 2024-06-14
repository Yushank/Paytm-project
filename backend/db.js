const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ripking00:yushpaytmproject@cluster0.v1ehekv.mongodb.net/')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
})

const accountSchema = mongoose.model({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        //reference to user model
        ref: "User",  
        required: true
    },
    balance: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', accountSchema)

module.exports = {User, Account}