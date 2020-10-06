const express = require('express')
const mongoose = require('mongoose')
const Message = require('./dbMessages')
const Pusher = require('pusher')
require('./firebase')

const messageRouter = require('./routers/messageRouter')
const authRouter = require('./routers/auth')

const app = express()

app.use(express.json())


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})

app.use(messageRouter)
app.use(authRouter)


// mongodb+srv://admin:<password>@cluster0.yx370.mongodb.net/<dbname>?retryWrites=true&w=majority
const connection_url = 'mongodb+srv://admin:chanu1225@cluster0.yx370.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const pusher = new Pusher({
    appId: '1074450',
    key: '40a295310b3d5bc07f91',
    secret: 'ee407e2764a9e698c7d4',
    cluster: 'ap2',
    encrypted: true
});

const db = mongoose.connection

db.once('open', () => {
    console.log("DB connected")

    const msgStream = Message.watch()
    // console.log(msgStream)
    msgStream.on('change', (change) => {
        console.log('change')

        if (change.operationType === 'insert') {
            console.log("triggering")
            const messageDetails = change.fullDocument
            pusher.trigger("messages", 'inserted',
                {
                    name: messageDetails.user,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received
                })
        } else {
            console.log("Error triggering pusher")
        }

    })
})





app.listen("9000", () => {
    console.log("server is up on server 5000")
})