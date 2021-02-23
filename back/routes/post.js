const express = require('express')
const Router = express.Router()

const { Post, Comment, Image, User } = require('../models')
const { isLoggedIn } = require('./middlewares')

Router.post('/',isLoggedIn, async (req, res, next) => {
    try{
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id
        })
        const fullPost = await Post.findOne({
            where:{ id: post.id},
            include: [{
                model: Image
            },{
                model: Comment
            },{
                model: User
            }]
        })
        res.status(200).json(fullPost)
    }catch(error) {
        console.error(error)
        next(error)
    }
})

Router.post(`/:postId/comment`,isLoggedIn, async (req, res, next) => {
     console.log(req.body)
    try{
        const post = await Post.findOne({
            where: { id: req.params.postId }
        })
        if(!post){
            return res.status(403).send(`This post doesn't exist`)
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id
        })
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
              model: User,
              attributes: ['id', 'nickname'],
            }],
          })
        res.status(200).json(fullComment)
    }catch(error) {
        console.error(error)
        next(error)
    }
})

Router.patch('/:postId/like', async(req, res, next) => {
    try{
        const post = await Post.findOne({ where:{ id: req.params.postId }})
        if(!post){
            return res.status(403).send(`This post doesn't exist`)
        }
        await post.addLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id})
    }catch(error){
        console.error(error)
        next(error)
    }
})

Router.delete('/:postId/like', async(req, res, next) => {
    try{
        const post = await Post.findOne({ where:{ id: req.params.postId }})
        if(!post){
            return res.status(403).send(`This post doesn't exist`)
        }
        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id})
    }catch(error){
        console.error(error)
        next(error)
    }
})

Router.delete('/:postId', async (req, res, next) => {
    try{
        await Post.destroy({
            where:{
                id: req.params.postId,
                Userid: req.user.id
            }
        })
        res.status(200).json({ PostId: parseInt(req.params.postId, 10)})
    }catch(error){
        console.error(error)
        next(error)
    }
})

module.exports = Router;