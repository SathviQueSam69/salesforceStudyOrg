public class BankAccount {
	//Private variable (encapsulated)
	private Decimal balance;
    //Constructor to initialize balance
    public BankAccount(Decimal initialBalance){
        if(initialBalance >= 0){
            this.balance = initialBalance;
        
        }
        else{
            this.balance = 0;
           
        }
    }
    //Public method to deposit money (Controlled access)
    public void deposit(Decimal amount){
        if(amount>0){
            this.balance = this.balance + amount;
            System.debug('Deposited:'+ amount + ',NewBalance:'+this.balance);
        }
        else{
            System.debug('Invalid deposit amount');
        }
        
    }
    //Public method to get the balance (Read-Only)
    public Decimal getBalance(){
        return this.balance;
    }
    //Public method to withdraw money (Controlled Access)
    public Boolean withdraw(Decimal amount){
        if(amount>0 && amount <= this.balance){
            this.balance = this.balance - amount;
            System.debug('Withdrawn:'+ amount + ',Remaining Balance:'+this.balance);
            return true;
        }
        else{
            System.debug('Invalid or insufficient funds');
            return false;
        }
    }
}