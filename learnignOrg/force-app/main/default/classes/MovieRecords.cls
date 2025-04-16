public class MovieRecords {
    
     @AuraEnabled(cacheable=true)
    public static List<Movie__c> getRecords(){
        
        return [Select Name,Genre__c,Description__c,Year__c from Movie__c];
    }

}