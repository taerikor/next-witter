const express = require('express')
const Router = express.Router()

const multer = require('multer')
const path = require('path')
const fs = require('fs');

const { Post, Comment, Image, User, Hashtag } = require('../models')
const { isLoggedIn } = require('./middlewares')

try{
    fs.accessSync('uploads')
} catch( error ) {
    console.log('create uploads dir')
    fs.mkdirSync('uploads')
} 


const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext)
            done(null, basename + '_' + new Date().getTime() + ext)
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024}
}) 

Router.post('/',isLoggedIn, upload.none(),async (req, res, next) => {
    try{
        const hashtags = req.body.content.match(/#[^\s#]+/g)
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id
        })

        if( hashtags ){
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() }
            })))
            await post.addHashtags(result.map(tag => tag[0]))
        }
        if(req.body.image){
            if(Array.isArray(req.body.image)){
                const images = await Promise.all(req.body.image.map(image => Image.create({ src: image})))
                await post.addImage(images)
            }else{
                const image = await Image.create({ src: req.body.image })
                await post.addImage(image)
            }
        }
        const fullPost = await Post.findOne({
            where:{ id: post.id},
            include: [{
                model: Image
            },{
                model: Comment,
                include: [{
                    model: User, // 댓글 작성자
                    attributes: ['id', 'nickname'],
                  }],
            },{
                model: User,
                attributes: ['id', 'nickname'],
            },{
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
              }]
        })
        res.status(200).json(fullPost)
    }catch(error) {
        console.error(error)
        next(error)
    }
})

Router.post(`/:postId/retweet`,isLoggedIn, async (req, res, next) => {
    try{
        const post = await Post.findOne({
            where: { id: req.params.postId },
            include: [{
                model: Post,
                as: 'Retweet'
            }]
        })
        if(!post){
            return res.status(403).send(`This post doesn't exist`)
        }
        if( req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)){
            return res.status(403).send(`Unable to retweet your post`)
        }
        const retweetTargetId = post.RetweetId || post.id
        const exPost = await Post.findOne({
            where: {
                UserId: req.user.id,
                RetweetId: retweetTargetId
            }
        })
        if(exPost) {
            return res.status(403).send(`You've already retweeted it.`)
        }
        const retweet = await Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'Retweet',
        })
        const retweetWithPrevPost = await Post.findOne({
            where: { id: retweet.id },
            include: [{
              model: Post,
              as: 'Retweet',
              include: [{
                model: User,
                attributes: ['id', 'nickname'],
              }, {
                model: Image,
              }]
            }, {
              model: User,
              attributes: ['id', 'nickname'],
            }, {
              model: Image,
            }, {
              model: Comment,
              include: [{
                model: User,
                attributes: ['id', 'nickname'],
              }],
            }],
        })
        res.status(200).json(retweetWithPrevPost)
    }catch(error) {
        console.error(error)
        next(error)
    }
})

Router.post(`/:postId/comment`,isLoggedIn, async (req, res, next) => {
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

Router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
    console.log(req.files)
    res.json(req.files.map(image => image.filename))
})

module.exports = Router;