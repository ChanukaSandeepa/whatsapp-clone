const express = require('express')
const firebase = require('firebase')
const User = require('../User')
const jwt = require('jsonwebtoken')
const Chat = require('../ChatHeads')

const router = new express.Router()


const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", '')
        console.log("my token found")
        console.log("\"" + token + "\"")

        const decode = jwt.verify(token, 'mytoken')
        console.log("my decoder")
        console.log(decode._id)
        const me = await User.findById(decode._id)
        req.user = me
        next()
    } catch (error) {
        console.log(error)
        res.send({ error: "Authentication failed", redirectUrl: '/signup' })
    }
}

router.post('/checking', async (req, res) => {
    const { contactNo } = req.body
    const ex = await User.findOne({ contactNo })
    if (ex) {
        return res.status(201).json({
            success: true,
            redirectUrl: '/',
            email: ex.email,
            contactNo: ex.contactNo,
            token: ex.tokens[0]
        })
    } else {
        return res.status(404).json({
            success: false
        })
    }
})

router.post('/user/register', async (req, res) => {
    try {
        console.log("inside register")

        const { email, contactNo, image, displayName } = req.body


        const user = new User({
            name: displayName,
            email,
            contactNo,
            image,
            status: true
        })

        const token = user.generateAuthToken(user._id)

        user.tokens = user.tokens.concat({ token })

        await user.save()
        res.status(201).json({
            success: true,
            redirectUrl: '/',
            email,
            contactNo,
            token
        })
    } catch (error) {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send({ error: { errorCode, errorMessage } })
    }
})

router.post('/newContact', auth, async (req, res) => {
    try {
        const { contactNo, contactName } = req.body
        const user = await User.findOne({ contactNo })
        if (!user) {
            return res.send({ error: "Invalid Contact Number" })
        }

        if (user._id.toString() === req.user._id.toString()) {
            console.log("user is same")
            return res.send({ error: "You can't add your self as a contact!" })
        } else {
            console.log("user is different", req.user._id, ' ', user._id)
        }

        req.user.friends = req.user.friends.concat({ account: user._id, name: contactName })
        await req.user.save()
        const chat = new Chat({
            type: "Single",
            name: '',
            users: [{ user: req.user._id }, { user: user._id }]
        })
        await chat.save()
        res.send({ success: true })
    } catch (error) {
        res.send({ error: "Something going wrong", redirectUrl: '/signup' })
    }

})

router.post('/chats', auth, async (req, res) => {
    const chats = await Chat.find({ 'users.user': req.user._id }).populate('users.user').exec()
    console.log("chatttttt")
    res.send({ chats })
    // console.log(chats)

})



router.get("/auth", auth, (req, res) => {
    res.send("damn")
})



module.exports = router