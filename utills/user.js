const User=require("../Models/user")
const findUserByEmail=async(email)=>{
const user=await User.findOne({email:email})
return user
}


const findUserById=async(id)=>{
const user=await User.findById({_id:id})
return user;
}

module.exports={findUserByEmail,findUserById}