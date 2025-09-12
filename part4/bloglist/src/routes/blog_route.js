const controller = require('../controllers/blog')
const blogRouter = require('express').Router()

blogRouter.get('/', controller.getAllBlogs)
blogRouter.post('/', controller.insertBlog)

module.exports=blogRouter