const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/register', (req, res) => {
    console.log(req.body)
    res.send(JSON.stringify({status: 'ok'}))
})

app.listen(5001, () => {
    console.log('Listening on port 5001')
})