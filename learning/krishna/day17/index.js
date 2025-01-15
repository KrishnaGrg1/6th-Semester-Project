//generate 6digits random number

function generate(){
    const number=parseInt(Math.random()*(100000))+100000
  
    if(number<=99999){
        return generate()
    }
    return number

    
}



for(let i=0;i<20;i++){
    console.log(generate())
   
}