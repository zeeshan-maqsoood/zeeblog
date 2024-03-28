const mongoose=require("mongoose")
const CommentModel=require("../Models/comments")
const apiResponse=require("../utills/apiResponse")
const createComment = async(req, res) => {
  try {
    const {id}=req.params
   const {comment}=req.body
const objectId=new mongoose.Types.ObjectId(id)
   const comments=await CommentModel({
    comment,
    blogId:objectId

   })
   await comments.save()
   if(!comments){
throw new Error("no saved")
   }
apiResponse.success(res,"commented")
  } catch (error) {
apiResponse.fail(res,error.message)
  }
};

const getCommentByBlogId=async(req,res)=>{
    try{
const {id}=req.params
const comment=await CommentModel.find({blogId:id})
if(!comment){
    throw new Error("no comment found")
}
apiResponse.success(res,comment)
    }catch(error){
apiResponse.fail(res,error.message)
    }
}

module.exports={createComment,getCommentByBlogId}