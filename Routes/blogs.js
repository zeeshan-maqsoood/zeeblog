const express=require("express")
const router=express.Router()
 const {createBlog,updateBlog,deleteBlog,getBlogById,getBlogByUserId}=require("../Controllers/blogController")
 const {createBlogRules,updateBlogRules}=require("../Validation/blogValidation")
 const authenticate=require("../Middleware/auth")
 const {userValidation}=require("../Middleware/user")
router.post("/create",[createBlogRules,userValidation,authenticate],createBlog)
router.put("/update/:id",[updateBlogRules,userValidation,authenticate],updateBlog)
router.delete("/delete/:id",authenticate,deleteBlog)
router.get("/:id",authenticate,getBlogById)
router.get("/all/:id",authenticate,getBlogByUserId)
module.exports=router