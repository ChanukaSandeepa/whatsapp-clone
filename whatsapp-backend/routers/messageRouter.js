const express = require('express')
const Message = require('../dbMessages')

const router = new express.Router()

router.get('/messages/sync', (req, res) => {
    console.log("syncing")
    Message.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

router.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Message.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

module.exports = router