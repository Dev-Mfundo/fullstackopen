const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs))
    throw new Error("Input should be an array of objects");
  return blogs.reduce((sum, value) => sum + value.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  const { title, author, likes } = _.maxBy(blogs, "likes");
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const counted = _.countBy(blogs, "author");
  const topAuthor = _.maxBy(Object.keys(counted), (author) => counted[author]);

  return {
    author: topAuthor,
    blogs: counted[topAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const grouped = _.groupBy(blogs, "author");
  const authorLikes = _.map(grouped, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, "likes"),
  }));

  return _.maxBy(authorLikes, "likes");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
