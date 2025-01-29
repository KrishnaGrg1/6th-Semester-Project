class bankAccount {
  constructor(name, dob, bankName, accounNumber) {
    this.name = name;
    this.dob = dob;
    this.bankName = bankName;
    this.accounNumber = accounNumber;
    this.balance = 0;
    this.transactionHistory = [];
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("Amount should be positive number");
      return;
    }
    this.balance = this.balance + amount;
    this.transactionHistory.push(`Deposited: ${amount}`);
  }
  withdraw(amount) {
    if (amount <= 0) {
      console.log("Amount should be positive number");
      return;
    } else if (amount > this.balance) {
      console.log("Insufficient amount");
    }
    this.balance = this.balance - amount;
    this.transactionHistory.push(`withdrawn: ${amount}`);
  }
  getBalance() {
    console.log(`Current Balance of ${this.name}:${this.balance}`);
  }

  getBankStatement() {
    console.log(`Bank Statement for ${this.name} (Account: ${this.accounNumber})`);
   for(let i=0;i<this.transactionHistory.length;i++){
    console.log(this.transactionHistory[i])
   }
  }

  transfer(amount, targetAccount) {
    if (amount <= 0) {
      console.log("Transfer amount must be positive.");
      return;
    }
    if (this.balance < amount) {
      console.log("Insufficient balance to transfer.");
      return;
    }
    this.balance -= amount;
    targetAccount.deposit(amount);
    this.transactionHistory.push(`Transferred: ${amount} to ${targetAccount.name}`);
    console.log(`${amount} successfully transferred to ${targetAccount.name}'s account.`);
  }
  
}


const Sujal=new bankAccount("Sujal", "2000-08-22","Nabil Bank","987654321")
const Rashi=new bankAccount("Rashi",'2001-02-22',"Nabil Bank","12345678")

Sujal.deposit(1000);

Sujal.transfer(200,Rashi)

Rashi.withdraw(100) 


Rashi.getBankStatement()



