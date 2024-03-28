const success=(res,data)=>{
res.status(200).json({success:true,data:data,status:200})
}
const fail=(res,error)=>{
    console.log(error,"data")
    res.status(400).json({success:false,status:400,error:error})
}

module.exports={success,fail}