const mongoose=require('mongoose');

const userSchema=new mongoose.Schema(
{
  name:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  borrowedBooks:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"book"
  }]
},
{
    timestamps:true
}
)
module.exports=mongoose.model("user",userSchema)