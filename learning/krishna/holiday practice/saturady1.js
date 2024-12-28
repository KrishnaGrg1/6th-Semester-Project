//After 2 seconds, print "Data fetched!".

// function fetch(){
//    return new Promise(function(res,rej){
//         setTimeout(function(){
//             res("Data fecthed")
//         },2000)
//     })
// }

// async function fetching(){
//     let value = await fetch()
//     console.log(value);
// }

// fetching();


//  function getUserData(){
//  return new Promise((res,rej)=>{
//     setTimeout(()=>{
//         res({"User": "John Doe",
//             "Email": "john.doe@example.com"})
//     })
//  },2000)
// }

//  function getUserPosts(){
//  return new Promise((res,rej)=>{
//     setTimeout(()=>{
//         res({
//             1: "This is my first post!",
//             2: "I love JavaScript!"})
//     })
//  })
// }

// async function fetch (){
//     let val1=await getUserData();
//     let val2=await getUserPosts();
//     console.log(val1);
//     console.log(val2)
// }

// fetch();


let val=[1,2,3,4,5,6,7,8,9];

let val2=val.map((a)=>{
    return a*2;
})

let val3=val.filter((a)=>{
    if(a%2==0){
        return a;
    }
})
console.log(val3);