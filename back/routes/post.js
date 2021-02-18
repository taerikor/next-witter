const express = require('express')
const Router = express.Router()

Router.get('/get', (req,res) => {
    res.send('get!')
})

module.exports = Router;