//give me 20thsecond.js


const twenty=()=>new Promise(function(res,rej){

   
        const timer=setInterval(function(){
            let date=new Date();
            if(new Date().getSeconds()===20){
                
                res(`Its ${date.getHours()}: ${new Date().getMinutes()}: ${new Date().getSeconds()} now \n timeout`)
                clearInterval(timer);
            }else{
                console.log(`Its ${date.getHours()}: ${new Date().getMinutes()}: ${new Date().getSeconds()} now`)
            }  
        },1000)
    
   

})

async function getime(){
  
    try{
        console.log(await twenty())
    }
    catch(e){
        console.log(e);
    }
  
    
  }


getime()