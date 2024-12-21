var cryptoData = {
    date: "21 may, 2024",
    currencies: [
        {
            'name': "BitCoin",
            "exchangeRate": 97000,
            'foundIn': '2005'
        },
        {
            'name': "Ethereum",
            "exchangeRate": 3200,
            'foundIn': '2013'
        }
        ,
        {
            'name': "Stack",
            "exchangeRate": 2.2,
            'foundIn': '2019'
        },
        {
            'name': "DogeCOIN",
            "exchangeRate": 0.32,
            'foundIn': '2016'
        }
    ],
}

// Task 20: Display the cryptocurrency with the earliest found year
// Write a function that returns the cryptocurrency object that was found the earliest (i.e., the smallest value of foundIn). Display the name and year found.


function earliestFound(money){
    let firstfound=money[0].foundIn;
    for(let i=0;i<(money).length;i++){
        
        if(parseInt(cryptoData.currencies[i].foundIn)<firstfound){
            firstfound=cryptoData.currencies[i].foundIn;
        }else{
            firstfound=firstfound;
        }
    }   
    return firstfound;
}
console.log("Earliest crypto Currencies was found in",earliestFound(cryptoData.currencies))

