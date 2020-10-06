const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Chat'
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message