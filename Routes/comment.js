const express = require("express");
const router = express.Router();
const { createCommentRules } = require("../Validation/commentValidation");
const authenticate = require("../Middleware/auth");
const { userValidation } = require("../Middleware/user");
const  {createComment,getCommentByBlogId}  = require("../Controllers/commentController");
router.post("/create/:id",[createCommentRules,userValidation,authenticate],createComment)
router.get("/:id",authenticate,getCommentByBlogId)
module.exports = router;
