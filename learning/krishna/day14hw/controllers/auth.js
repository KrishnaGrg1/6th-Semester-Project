import catchAsync from "../helpers/catchAsync.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt'
import { createJwt, findUserByEmail } from "../services/user.js";



const register=catchAsync(async function(req,res){
    const existingUser=await findUserByEmail(req.body.email);
    
    if(existingUser){
        throw new Error ("Email already taken or used");
    }
    
    const hashedPassword=await bcrypt.hash(req.body.password,10);
    const newUser=(await User.create({...req.body,password:hashedPassword})).toObject();

    return res.json({
        message:"User Registered Successfully",
        user:{...newUser,password:undefined}
    })

})

const login=catchAsync(async(req,res)=>{
    const {email,password}=req.body;

    const existingUser=await findUserByEmail(email);

    

    if(!existingUser){
        throw new Error ("Incorrect Email");
    }

    const hashedPassword=existingUser.password;

    const matched=await bcrypt.compare(password,hashedPassword);

    if(matched){
       const token=createJwt(existingUser._id)
        return res.json({
            message:"Successfully User logged In",
            User:{...existingUser,password:undefined,token}
        })
    }else{
        throw new Error ("Invalid email and password")
    }
})

const authController={register,login}

export default authController


