const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    users: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }

        }
    ],
    name: String,
    type: String
})

chatSchema.virtual('messages', {
    ref: 'Messages',
    localField: '_id',
    foreignField: 'chat'
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat