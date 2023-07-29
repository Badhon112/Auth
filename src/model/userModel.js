import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type:String,
    require:[true,'plz Provide a Username'],
    unique:true
  },
  email:{
    type:String,
    require:[true,'Plz provide a email'],
    unique:true
  },
  password:{
    type:String,
    require:[true,'plz provide a password']
  },
  isVeried:{
    type:Boolean,
    default:false
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  forgetPasswordToken:String,
  forgetPasswordTokenExpire:Date,
  verifyToken:String,
  verifyTokenExpire:Date    
});
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;