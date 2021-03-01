const express = require('express')
const app = express()
const db = require('./models')
const path = require('path')

const cors = require('cors')

const helmet = require('helmet')
const hpp = require('hpp')
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

    if(process.env.NODE_ENV === 'production'){
        app.use(morgan('combined'));
        app.use(helmet());
        app.use(hpp());
    }else{
        app.use(morgan('dev'));
    }

    const frontUrl = 'http://13.124.190.137'

app.use(cors({
    origin: ['http://localhost:3000',frontUrl],
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


const port = 80
app.listen(port, () => {console.log(`connected Port : ${port}`)})