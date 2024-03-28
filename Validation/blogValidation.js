const {body,param}=require("express-validator")

const createBlogRules=[
    body("title").trim().notEmpty().withMessage("title is required"),
    body("content").trim().notEmpty().withMessage("content is required")

]

const updateBlogRules=[
    ...createBlogRules
]

module.exports={createBlogRules,updateBlogRules}