const express = require('express')
const Router = express.Router();

const { Op } = require('sequelize');

const { User, Hashtag, Image, Post,Comment } = require('../models');


Router.get('/:tag', async (req, res, next) => {
    try {
      const where = {};
      if (parseInt(req.query.lastId, 10)) { 
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
      }
      const posts = await Post.findAll({
        where,
        limit: 10,
        include: [{
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
        }, {
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
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
          }],
        },{
            model: Comment,
                  include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                  }]
        }],
      });
      res.json(posts);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  

module.exports = Router