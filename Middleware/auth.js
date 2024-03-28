const jwt=require("jsonwebtoken")
const config=require("../Config/index")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1]

if(!token){
    return res.status(401).json({message:"Token not Provided"})

}

jwt.verify(token,config.jwt_secret,(err,decode)=>{
    if(err){
        return res.status(401).json({message:"Invalid token"})
    }
    req.user=decode;
    next()
})


}


module.exports=authenticate

