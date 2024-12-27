

const Naya=()=>new Promise(function(res,rej){
 
        const timer=setTimeout(function(){
            const randomNumber=parseInt(Math.random()*100);
            if(randomNumber%10===0){
                rej("Zero ayo last ma "+randomNumber);

            }else{
                res("Zero ayana last ma "+randomNumber)
            }  
            clearTimeout(timer)
        },2000)
})
console.log("sarting...")


async function randomkoNumberzerohokinai(){
   for(let i=0;i<10;i++){
    console.log("Iteration: "+(i+1));
    try{
        console.log(await Naya()) 
        console.log(await Naya()) 
    }
    catch(e){
        console.log("Error:",e)
    }
   }
    
}
randomkoNumberzerohokinai()
// for(let i=0;i<10;i++){
//     return randomkoNumberzerohokinai();
// }
// setInterval(randomkoNumberzerohokinai,2000)

    
