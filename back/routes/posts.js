const express = require('express')
const Router = express.Router()
const { Op } = require('sequelize')

const { Post, Comment, Image, User } = require('../models')

Router.get('/', async (req, res, next) => {
    try{
      const where = {}
      if(parseInt(req.query.lastId, 10)){
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
      }
      const posts = await Post.findAll({
        where,
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