const BlogModel = require("../Models/blog");
const mongoose = require("mongoose");
const apiResponse = require("../utills/apiResponse");
const createBlog = async (req, res) => {
  console.log("hello");
  try {
    const { id, username } = req.user;
    const { title, content } = req.body;
    const objectId = new mongoose.Types.ObjectId(id);
    const newBlog = await BlogModel({
      title,
      content,
      author: {
        username,
        userId: objectId,
      },
    });

    await newBlog.save();
    if (!newBlog) {
      throw new Error("SOMETHING WENT WRONG");
    }
    apiResponse.success(res, "Blog has been Created");
  } catch (error) {
    apiResponse.fail(res, error.message);
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const objectId = new mongoose.Types.ObjectId(req.user.id);
    const blog = await BlogModel.findById({ _id: id });
    if (!blog) {
      throw new Error("No Blog Found");
    }
    if (JSON.stringify(blog.author.userId) !== JSON.stringify(objectId)) {
      throw new Error(
        "You cannot update this blog! beacause you are owner of this blog"
      );
    }
    const updateBlog = await BlogModel.findByIdAndUpdate(
      { _id: id },
      {
        title,
        content,
        author: {
          username: req.user.username,
          userId: objectId,
        },
      }
    );
    apiResponse.success(res, "Blog has been updated");
  } catch (error) {
    apiResponse.fail(res, error.message);
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById({ _id: id });
    if (!blog) {
      throw new Error("no blog found");
    }
    if (JSON.stringify(blog.author.userId) !== JSON.stringify(req.user.id)) {
      throw new Error(
        "You cannot delete this blog! beacause you are not owner of this blog"
      );
    }
    const deleteBlog = await BlogModel.findByIdAndDelete({ _id: id });
    apiResponse.success(res, "Blog has been deleted");
  } catch (error) {
    apiResponse.fail(res, error.message);
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModel.findById({ _id: id }, { author: 0 });
    if (!blog) {
      throw new Error("no blog found");
    }
    apiResponse.success(res, blog);
  } catch (error) {
    apiResponse.fail(res, error.message);
  }
};

const getBlogByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModel.find({ "author.userId": id }, { author: 0 });
    if (!blog) {
      throw new Error("no blog found");
    }
    apiResponse.success(res, blog);
  } catch (error) {
    apiResponse.fail(res);
  }
};
module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getBlogByUserId,
};
