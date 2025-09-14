const express = require("express");
const app = express();
const middleware = require("./utils/middleware");
const blogRouter = require("./routes/blog_route");

app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blog", blogRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
