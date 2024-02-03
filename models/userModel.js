const mongoose= require('mongoose');

const userSchema =  mongoose.Schema({
   user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",

    }

    name:{
        type:String,
        required:[true,"Please enter your name"],

    },

    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:[true,"Email already exists"]

    },

    password:{
        type:String,
        required:[true,"Please enter your password"],

    },
    },
    {
        timestamps:true,
    }

);

module.exports=mongoose.model("User",userSchema);