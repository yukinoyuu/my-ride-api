const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('./models/user.model')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/my-ride')

app.post('/api/register', async (req, res) => {
    try {
        const user = await User.create({
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password
        })
        console.log(user)
        res.json({status: 'ok'})
    } catch (e) {
        res.send(JSON.stringify({"status": "error"}))
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})

    if(user) {
        if(bcrypt.compare(req.body.password, user.password)) {

            const token = jwt.sign({
                email: user.email,
                userName: user.userName
            }, process.env.JWT_SECRET)

            res.json({status: "ok", token: token})

        } else res.json({status: "Wrong username or password"})
    } else res.json({status: "Wrong username or password"})
})

app.listen(5001, () => {
    console.log('Listening on port 5001')
})