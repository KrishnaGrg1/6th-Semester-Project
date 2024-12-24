

// const randomNumber=parseInt(Math.random()*100);
// console.log(randomNumber)


const Naya=new Promise(function(res,rej){
    const randomNumber=parseInt(Math.random()*100);


    // if(randomNumber%10==0){
    //     const timer=setTimeout(function(){
    //         rej("Zero ayo last ma")
    //     },1000)
    // }else{
    //     const timer=setTimeout(function(){
    //         res("Zero ayana last ma")
    //     },1000)
    // }


         const timer=setTimeout(function(){
            if(randomNumber%10==0){
                rej("Zero ayo last ma")
            }else{
                res("Zero ayana last ma")
            }  
        },1000)

})
console.log("sarting...")

// Naya.then(function(a){
//     console.log(a)
// }).catch(function(e){
//     console.log("Error:",e)
// })


async function randomkoNumberzerohokinai(){
    try{
        console.log(await Naya)
    }
    catch(e){
        console.log("Error:",e)
    }
}

randomkoNumberzerohokinai()