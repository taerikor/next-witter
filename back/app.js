const express = require('express')
const app = express()
const db = require('./models')
const cors = require('cors')
const passport = require('passport')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

const passportConfig = require('./passport')

dotenv.config();
db.sequelize.sync()
    .then(() => {
        console.log('db Connected Success')
    })
    .catch(console.error)

passportConfig();

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('hello world!!!')
})

const postRouter = require('./routes/post')
const userRouter = require('./routes/user')

app.use('/post',postRouter )
app.use('/user',userRouter )

const port = 5000
app.listen(port, () => {console.log(`connected Port : ${port}`)})