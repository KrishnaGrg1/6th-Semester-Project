import { config } from "dotenv";

config();
const api=process.env.API;
const getJokes=async(req,res)=>{
    try{
        const response=(await fetch(api));
      
        const text=await response.json();
        let value=text.value
        value=value.replace("Chuck Norris","Bishal")
   
        return res.json({
            Jokes:value
        })

    }catch(e){
        return res.status(400).json({
            error:e.message
        })
    }
}

export default getJokes

