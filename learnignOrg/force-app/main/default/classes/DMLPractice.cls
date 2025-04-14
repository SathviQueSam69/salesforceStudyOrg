//Create a new Account with name "WingNut Films" and Rating "Warm"
//Create a new Opportunity "Lord Of The Rings" for this Account with below values
//Stage: Qualification and Closed Date: Today
//Update Account Name to "New Line Cinema"
//Update Opportunity Stage to "Closed-Won"
//Delete the Opportunity 
//Undelete the Opportunity
public class DMLPractice {
    public static void newAccount(){
        Account acc= new Account();
        acc.Name = 'WingNut Films';
        acc.Rating = 'Warm';
        
        insert acc;
    }
    public static void newOpportunity(){
        Opportunity opp = new Opportunity();
        opp.Name = 'Lord Of The Rings';
        opp.CloseDate = Date.Today();
        opp.StageName = 'Qualification';
        
        insert opp;
    }
    public static void updateAccount(){
        List<Account> acc = new List<Account>();
        acc = [Select id,Name from Account where Name='WingNut Films'];
        for(Account account: acc){
            account.Name = 'New Line Cinema';
        }
        update acc;
    }
    public static void updateOpportunity(){
        List<Opportunity> opp = new List<Opportunity>();
        opp = [Select id,Name From Opportunity where Name like '%Lord%'];
        for(Opportunity oppor:opp){
            oppor.StageName = 'Closed-Won';
            
        }
        update opp;
    }
    public static void deleteOpportunity(){
        List<Opportunity> opp = new List<Opportunity>();
        opp = [Select id,Name from Opportunity where Name like '%Lord%'];
        delete opp;
    }
    public static void undeleteOpportunity(){
        List<Opportunity> opp = new List<Opportunity>();
        opp = [Select id,Name from Opportunity ALLROWS where isDeleted = true];
        undelete opp;
    }
    

}