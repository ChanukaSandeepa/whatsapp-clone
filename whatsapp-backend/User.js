const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: String,
    contactNo: Number,
    email: String,
    status: Boolean,
    image: String,
    tokens: [{
        token: String
    }],
    friends: {
        type: [{
            account: mongoose.Schema.Types.ObjectId,
            name: String
        }],
        ref: 'User'
    }
})

userSchema.methods.generateAuthToken = (id) => {
    console.log(id)
    const token = jwt.sign({ _id: id }, 'mytoken');
    console.log("generate token")
    console.log(token)
    return token
}

userSchema.virtual('chats', {
    ref: 'Chat',
    localField: '_id',
    foreignField: 'users'
})

const User = mongoose.model('User', userSchema)

module.exports = User