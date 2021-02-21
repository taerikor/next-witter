const express = require('express')
const Router = express.Router()
const bcrypt = require('bcrypt')

const { User, Post } = require('../models')
const passport = require('passport')

const {isLoggedIn, isNotLoggedIn} = require('./middlewares')
Router.post('/', isNotLoggedIn,async (req,res, next) => {
    try{
        const exUser = await User.findOne({
             where:{
                 email:req.body.email
             }
         })
         if(exUser){
             return res.status(403).send('already used email')
         }
     
         const hashPassword = await bcrypt.hash(req.body.password, 10)
         await User.create({
             email:req.body.email,
             nickname:req.body.nickname,
             password: hashPassword,
         })
         res.status(201).send('success')
    } catch (error){
        console.error(error)
        next(error)
    }
})

Router.post('/login',isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err,user,info) => {
        if(err){
            console.error(err)
            return next(err)
        }
        if(info){
            return res.status(400).send(info.reason)
        }
        return req.login(user, async (loginErr) => {
            if(loginErr) {
                return next(loginErr)
            }
            const fullUserWithoutPassword = await User.findOne({
                where:{ id: user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                },
                {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                },
                {
                    model: User,
                    as: 'Followers',
                    attributes: ['id']
                }]
            })
            return res.status(200).json(fullUserWithoutPassword)
        })
    })(req, res, next)
})

Router.post('/logout',isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('success')
})

module.exports = Router;