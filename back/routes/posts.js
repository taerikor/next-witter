const express = require('express')
const Router = express.Router()

const { Post, Comment, Image, User } = require('../models')
const { isLoggedIn } = require('./middlewares')

Router.get('/', async (req, res, next) => {
    try{
      const posts = await Post.findAll({
        limit: 10,
        order: [
          ['createdAt', 'DESC'],
          [Comment, 'createdAt', 'DESC'],
        ],
        include: [{
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
        }, {
          model: User, // 좋아요 누른 사람
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
    }catch(error){
        console.error(error)
        next(error)
    }
})
module.exports = Router;