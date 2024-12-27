const countdown=(n)=>new Promise(function(res,rej){

        const timer=setInterval(function(){
            if(--n===0){
                res('Completed');
                
            }else{
                console.log(n,"sec remaining")
            }
        },1000)

});

countdown(10).then(function(r){
    console.log(r)
}).catch(function(e){
    console.log(e)
})