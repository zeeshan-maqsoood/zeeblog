const mongoose=require("mongoose")

const commentsSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    blogId:{
        type:mongoose.Types.ObjectId,
        ref:"blog"
    }
})


const CommentModel=mongoose.model("comments",commentsSchema)
module.exports=CommentModel