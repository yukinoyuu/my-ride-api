const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        userName: { type: String, required: true, unique: true },
        password: { type: String, required: true }
})

User.pre('save', async function (next) {
        try{
                const salt = await bcrypt.genSalt(12)
                const hashedPassword = await bcrypt.hash(this.password, salt)
                this.password = hashedPassword
                next()
        } catch (err) {
                next(err)
        }
})

const model = mongoose.model('UserData', User)

module.exports = model