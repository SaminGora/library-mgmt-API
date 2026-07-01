const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema(
{
  name:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  price:{
    type:Number,
    required:[true,"price is required"]
  }
},{
    timestamps:true
}
)
module.exports=mongoose.model("book",bookSchema)