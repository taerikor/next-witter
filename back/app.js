const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hello world')
})

const postRouter = require('./routes/post')

app.use('/posts',postRouter )

const port = 5000
app.listen(port, () => {console.log(`connected Port : ${port}`)})