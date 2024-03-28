const express=require("express")
const router=express.Router()
const {signup,verifyCode,signIn}=require("../Controllers/userController")
const {validationResult}=require("express-validator")
const {signupValidationRules,verifyCodeRules,signInRules}=require("../Validation/userValidation")
const {userValidation}=require("../Middleware/user")
const authenticate=require("../Middleware/auth")
router.post("/signup", [signupValidationRules,userValidation],signup)
router.post("/verifyCode",[verifyCodeRules,userValidation,authenticate],verifyCode)
router.post("/signIn",[signInRules,userValidation],signIn)

module.exports=router