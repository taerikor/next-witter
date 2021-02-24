const express = require('express')
const Router = express.Router()
const bcrypt = require('bcrypt')

const { User, Post } = require('../models')
const passport = require('passport')

const {isLoggedIn, isNotLoggedIn} = require('./middlewares')



Router.get('/', async (req,res, next) => {
    try{
        if(req.user){
            const fullUserWithoutPassword = await User.findOne({
                where:{ id: req.user.id },
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
        } else {
            return res.status(200).json(null)
        }
    } catch (error){
        console.error(error)
        next(error)
    }
})

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

Router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('success')
})

Router.patch('/nickname', isLoggedIn, async(req, res, next) => {
    try{
        await User.update({
            nickname: req.body.nickname
        },{
            where: { id: req.user.id }
        })
        res.status(200).json({ nickname: req.body.nickname})
    }catch(error){
        console.error(error)
        next(error)
    }
})

Router.patch('/:userId/follow', isLoggedIn, async(req, res, next) => {
    try{
       const user = await User.findOne({ where: { id: req.params.userId }})
       if(!user){
           return res.status(403).send('user not find')
       }
       await user.addFollowers(parseInt(req.user.id))
        res.status(200).json({ UserId: parseInt(req.params.userId, 10)})
    }catch(error){
        console.error(error)
        next(error)
    }
})
Router.delete('/:userId/follow', isLoggedIn, async(req, res, next) => {
    try{
        const user = await User.findOne({ where:{id: req.params.userId}})
        if(!user){
            return res.status(403).send('user not find')
        }
        await user.removeFollowers(req.user.id)
         res.status(200).json({ UserId: parseInt(req.params.userId, 10)})
     }catch(error){
         console.error(error)
         next(error)
     }
})

Router.get('/following', isLoggedIn, async(req, res, next) => {
    try{
        const user = await User.findOne({ where:{id: req.user.id}})
        if(!user){
            return res.status(403).send('user not find')
        }
        const following = await user.getFollowings();
         res.status(200).json(following)
     }catch(error){
         console.error(error)
         next(error)
     }
})

Router.get('/follower', isLoggedIn, async(req, res, next) => {
    try{
        const user = await User.findOne({ where:{id: req.user.id}})
        if(!user){
            return res.status(403).send('user not find')
        }
        const follower = await user.getFollowers();
         res.status(200).json(follower)
     }catch(error){
         console.error(error)
         next(error)
     }
})

Router.delete('/:userId/follower', isLoggedIn, async(req, res, next) => {
    try{
        const user = await User.findOne({ where:{id: req.params.userId}})
        if(!user){
            return res.status(403).send('user not find')
        }
        await user.removeFollowings(req.user.id)
         res.status(200).json({ UserId: parseInt(req.params.userId, 10)})
     }catch(error){
         console.error(error)
         next(error)
     }
})

module.exports = Router;