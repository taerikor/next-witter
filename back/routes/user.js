const express = require('express')
const Router = express.Router()
const bcrypt = require('bcrypt')

const { User, Post, Image, Comment } = require('../models')
const passport = require('passport')

const {isLoggedIn, isNotLoggedIn} = require('./middlewares')
const { Op } = require('sequelize')



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



Router.get('/following', isLoggedIn, async(req, res, next) => {
    try{
        const user = await User.findOne({ where:{id: req.user.id}})
        if(!user){
            return res.status(403).send('user not find')
        }
        const following = await user.getFollowings({
            attributes: ['id','nickname'],
            limit: parseInt(req.query.limit, 10)
        });
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
        const follower = await user.getFollowers({
            attributes: ['id','nickname'],
            limit: parseInt(req.query.limit, 10)
        });
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

Router.get('/:id/posts', async (req, res, next) => {
    try{
        const user = await User.findOne({ where: { id: req.params.id }})
        if(user){
            const where = {}
            if(parseInt(req.query.lastId, 10)){
              where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
            }
            const posts = await user.getPosts({
              where,
              limit: 10,
              include: [{
                  model: Image,
                }, {
                  model: Comment,
                  include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                  }]
                }, {
                  model: User,
                  attributes: ['id', 'nickname'],
                }, {
                  model: User,
                  through: 'Like',
                  as: 'Likers',
                  attributes: ['id'],
                }, {
                  model: Post,
                  as: 'Retweet',
                  include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                  }, {
                    model: Image,
                  }]
                }],
            });
              res.status(200).json(posts)
        }else{
            res.status(404).send('Not found user')
        }
    }catch(error){
        console.error(error)
        next(error)
    }
})

Router.get('/:id', async (req, res, next) => { // GET /user/3
    try {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      if (fullUserWithoutPassword) {
        const data = fullUserWithoutPassword.toJSON();
        data.Posts = data.Posts.length;
        data.Followings = data.Followings.length;
        data.Followers = data.Followers.length;
        res.status(200).json(data);
      } else {
        res.status(404).json('존재하지 않는 사용자입니다.');
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

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


module.exports = Router;