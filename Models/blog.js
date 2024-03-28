const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    username: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
  },
});

const blogModel=mongoose.model("blog",blogSchema)

module.exports=blogModel