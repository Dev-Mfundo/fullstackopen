const Blog = require("../models/blog");

const getAllBlogs = (request, response, next) => {
  Blog.find({})
    .then((blog) => {
      response.status(200).json(blog);
    })
    .catch((error) => next(error));
};

const insertBlog = (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
  });
  blog
    .save()
    .then((newBlog) => {
      response.status(200).json(newBlog);
    })
    .catch((error) => next(error));
};

module.exports = { getAllBlogs, insertBlog };
