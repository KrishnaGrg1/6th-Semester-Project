import { config } from "dotenv";

config();
const api=process.env.API;
const getJokes=async(req,res)=>{
    try{
        const response=(await fetch(api));
      
        const text=await response.json();
        let jokes=text.value
        jokes=jokes.replace(/Chuck Norris/g, "Bishal");
   
        return res.json({
            jokes
        })

    }catch(e){
        return res.status(400).json({
            error:e.message
        })
    }
}

export default getJokes

