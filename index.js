const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/my-ride')

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        await User.create({
                email: req.body.email,
                userName: req.body.userName,
                password: req.body.password
        })
    } catch (e) {
        res.send(`{"status": "error"}`)
    }
    res.send(JSON.stringify({status: 'ok'}))
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email, password: req.body.password})

    if(user) res.send(JSON.stringify({status: 'ok', user: true}))
    else res.json({status: "Error: User not found"})
})

app.listen(5001, () => {
    console.log('Listening on port 5001')
})