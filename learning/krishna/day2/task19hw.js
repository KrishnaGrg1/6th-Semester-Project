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

// Task 19: Check if a currency exists in the list
// Write a function that checks whether a cryptocurrency (e.g., "Bitcoin", "Cardano") exists in the currencies array. It should return true or false.




function Search(money){
    let b=cryptoData.currencies
    for(let i=0;i<(b).length;i++){
        if(b[i].name===money){
            return `True`;
        }else{
            return `False`;
        }
    }   
}
console.log(Search("BitCoin"))
console.log(Search("Cardano"))