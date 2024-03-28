const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const config = require("./Config");
app.use(bodyParser.json());
const connectMongoDb = require("./Database/index");
const UserRouter=require("./Routes/user")
const UserProfileRouter=require("./Routes/userProfile")
const BlogRouter=require("./Routes/blogs")
const commentRouter=require("./Routes/comment")
dotenv.config();
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});
connectMongoDb();
app.use("/api/auth",UserRouter)
app.use("/api/profile",UserProfileRouter)
app.use("/api/blog",BlogRouter)
app.use("/api/comment",commentRouter)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`server is connected on ${PORT}`);
});
