const nayaPromise=new Promise(function(res,rej){
    const Interval=setTimeout(function(){
        res("ma padxu parsi dekhi");
    },2000)
    const Interval1=setTimeout(function(){
        rej("Reject Vayo")
    },1100)
})

console.log("sarting...")

async function naya(){
    try{
        console.log(await nayaPromise)
    }
    catch(e){
        console.log("Error: ",e)
    }
}

naya();