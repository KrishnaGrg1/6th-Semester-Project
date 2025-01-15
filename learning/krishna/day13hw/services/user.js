import User from "../models/user.js";

const findUserByEmail=async(email)=>{
    const user=await User.findOne({email});
    if(user) return user.toObject();
    else return null
}


export default findUserByEmail