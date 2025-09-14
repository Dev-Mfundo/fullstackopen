const mongoose = require("mongoose");
const { MONGODB_URL } = require("../utils/config");

mongoose.set("strictQuery", true);

mongoose.connect(MONGODB_URL);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title required"],
    minlength: [3, "title should be more than 3 characters long"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    minlength: [3, "Author should be more than 3 characters long"],
  },
  url: {
    type: String,
    required: [true, "Url required"],
    minlength: [3, "Url is too short"],
  },
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
