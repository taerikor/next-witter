const express = require('express')
const app = express()
const db = require('./models')
const path = require('path')

const cors = require('cors')

const morgan = require('morgan')
const dotenv = require('dotenv')

const passport = require('passport')
const passportConfig = require('./passport')

const session = require('express-session')
const cookieParser = require('cookie-parser')



dotenv.config();
passportConfig();

db.sequelize.sync()
    .then(() => {
        console.log('db Connected Success')
    })
    .catch(console.error)

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}))

app.use(express.static(path.join(__dirname, 'uploads')))
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

const postsRouter = require('./routes/posts')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const hashtagRouter = require('./routes/hashtag')

app.use('/posts',postsRouter )
app.use('/post',postRouter )
app.use('/user',userRouter )
app.use('/hashtag',hashtagRouter )


const port = 5000
app.listen(port, () => {console.log(`connected Port : ${port}`)})