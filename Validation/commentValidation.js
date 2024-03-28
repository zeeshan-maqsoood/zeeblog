const {body,param}=require("express-validator")


const createCommentRules=[
    body("comment").trim().notEmpty().withMessage("comment is required")
]


module.exports={createCommentRules}