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
        },
        {
            'name': "DogeCOIN",
            "exchangeRate": 0.32,
            'foundIn': '2016'
        },
        {
            'name': "Stack",
            "exchangeRate": 2.2,
            'foundIn': '2019'
        }
    ],
}

// Task 1: Display the exchange rate for Ethereum
// Write a code snippet that shows the following output:
// "The rate of Ethereum is 3200 as of 21 may, 2024"
// console.log(`The rate of ${cryptoData.currencies[1].name} is ${cryptoData.currencies[1].exchangeRate} as of ${cryptoData.date}`);


// Task 2: Add a new cryptocurrency to the list
// Add a new cryptocurrency called Solana with the following properties:

// name: "Solana"
// exchangeRate: 190
// foundIn: "2020"

// cryptoData.currencies.push({
//     'name':"Solona",
//     'exchangeRate':190,
//     'foundIn':'202'
// })

// console.log(cryptoData.currencies)

//Task 3: Change the exchange rate of Stack. Change the exchange rate of Stack from 2.2 to 2.45.

// cryptoData.currencies[3].exchangeRate=2.45;
// console.log(cryptoData.currencies[3])


// Task 4: Update the foundIn year for Dogecoin
// Change the year Dogecoin was found to "2014".
// cryptoData.currencies[2].foundIn='2014';
// console.log(cryptoData.currencies[2])

// Task 5: Remove the cryptocurrency DogeCoin from the list
// Remove the cryptocurrency object for DogeCoin from the currencies array.
// cryptoData.currencies.pop();
// console.log(cryptoData.currencies[i].exchangeRate)

// Task 6: Calculate the total exchange rate for all currencies
// Write a function that calculates the sum of the exchangeRate for all the cryptocurrencies listed in currencies.
// let sum=0;
// function add(num){
//     for(let i=0;i<(num).length;i++){
//     sum=sum+num[i].exchangeRate;
//     }
//     return sum;
// }
// console.log("Total sum of exchange rate is ",add(cryptoData.currencies))


// Task 7: Display all cryptocurrencies found after 2010
// Create a list of cryptocurrencies that were found after the year 2010. For example, you can create a new array and log out the details of those currencies.
// for(let i=0;i<(cryptoData.currencies).length;i++){
//         if(cryptoData.currencies[i].foundIn>2010){
//             console.log(cryptoData.currencies[i])
//         }
//         }

// Task 8: Add a new property symbol to all currencies
// Add a new property symbol for each currency. Here’s what the values for symbol could be:
// "Bitcoin" → "BTC"
// "Ethereum" → "ETH"
// "DogeCoin" → "DOGE"
// "Stack" → "STACK"
// "Solana" → "SOL"


// Task 9: Sort the currencies by exchange rate
// Write code to sort the currencies by their exchange rate in descending order and log the sorted list


//task10:
// function max(a){
//     let maxNum=0;
//     for(let i=0;i<(a).length;i++){
//         if(maxNum<a[i].exchangeRate){
//             maxNum=a[i].exchangeRate;
//         }
//         else{
//             maxNum=maxNum;
//         }
//     }
//     return `Maximum exchangeRate is ${maxNum}` ;
// }
// console.log(max(cryptoData.currencies))



//task11:Find the index of Ethereum in the currencies list.
//Find the index position of Ethereum in the currencies array and display it.


//task12:
// function getall(name){
//     let n='';
//     for(let i=0;i<(name).length;i++){
//         n=n+cryptoData.currencies[i].name+" ";
//         }
//         return n;
// }
// console.log(`"${getall(cryptoData.currencies)} "`);


//task13:
// let sum=0;
// function add(num){
//     for(let i=0;i<(num).length;i++){
//     sum=sum+num[i].exchangeRate;
//     }
//     return sum;
// }
// let total=add(cryptoData.currencies);


// const cryptoSummary={
//     date: "21 may, 2024",
//     totalCurriencies:total,
// }

// console.log(cryptoSummary)


// Task 14: Add a property lastUpdated with the current date
// Add a new property lastUpdated to the cryptoData object. Set this to the current date in the format DD MM, YYYY. You can use the Date object for this task.

// Task 15: Find the currency with the name "Stack"
// Write a function that searches for the cryptocurrency called "Stack" and returns its details (including the name, exchange rate, and year found).
// function search(c){
//     for(let i=0;i<(cryptoData.currencies).length;i++){
//      if(cryptoData.currencies[i].name===c){
//          console.log(cryptoData.currencies[i])
//      }
//  }
//  }
 
//  search("Stack");


// Task 16: Create an object of crypto names and their rates
// Create a new object where each property is the name of a cryptocurrency, and the value is its exchange rate.

// Example output:

// javascript
// Copy code
// {
//   BitCoin: 97000,
//   Ethereum: 3200,
//   DogeCoin: 0.32,
//   Stack: 2.2
// }


// Task 17: Convert the exchange rate of all currencies to USD
// Write a function that takes an exchange rate in a different currency (e.g., Euro, GBP, etc.) and converts all the cryptocurrency rates to USD. This will involve multiplying the exchange rate by a conversion factor.
// function conversionUsd(money){
//     for(let i=0;i<(money).length;i++){

//         let convertedMoney=money[i].exchangeRate*1.01
//     console.log(`${money[i].name} is converted from €${money[i].exchangeRate} to $${convertedMoney}`);
// }   
// }
// conversionUsd(cryptoData.currencies)

// Task 18: Show how many years ago each cryptocurrency was created
// For each cryptocurrency, calculate how many years ago it was created from the current year (2024). Add a new property yearsAgo to each cryptocurrency object and display the updated array.
// function createdAgo(money){
//     for(let i=0;i<(money).length;i++){
//         let latestYear=2024
//         let YearAgo=latestYear-parseInt(money[i].foundIn)
//         console.log(`${money[i].name} was created ${YearAgo} ago`);
// }   
// }
// createdAgo(cryptoData.currencies)

// Task 19: Check if a currency exists in the list
// Write a function that checks whether a cryptocurrency (e.g., "Bitcoin", "Cardano") exists in the currencies array. It should return true or false.
// function Search(money){
//     for(let i=0;i<(cryptoData.currencies).length;i++){
//         if(cryptoData.currencies[i].name===money){
//             return `True`;
//         }else{
//             return `False`;
//         }
//     }   
// }
// console.log(Search("BitCoin"))
// console.log(Search("Cardano"))

// Task 20: Display the cryptocurrency with the earliest found year
// Write a function that returns the cryptocurrency object that was found the earliest (i.e., the smallest value of foundIn). Display the name and year found.
// function earliestFound(money){
//     let firstfound=money[0].foundIn;
//     for(let i=0;i<(money).length;i++){
        
//         if(parseInt(cryptoData.currencies[i].foundIn)<firstfound){
//             firstfound=cryptoData.currencies[i].foundIn;
//         }else{
//             firstfound=firstfound;
//         }
//     }   
//     return firstfound;
// }
// console.log("Earliest crypto Currencies was found in",earliestFound(cryptoData.currencies))


