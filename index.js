const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen(5001, () => {
    console.log('Listening on port 5001')
})