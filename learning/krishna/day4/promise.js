const nayaPromise=new Promise(function(res,rej){
    const Interval=setTimeout(function(){
        res("ma padxu parsi dekhi");
    },2000)
    const Interval1=setTimeout(function(){
        rej("Reject Vayo")
    },1100)
})

console.log("sarting...")
nayaPromise.then(function(a){
    console.log(a)
}).catch((function(e){
    console.log("Error",e)
}))

