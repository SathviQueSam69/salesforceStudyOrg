public class TvShowRecords {
    
    @AuraEnabled(cacheable=true)
    public static List<TvShow__c> getRecords(){
        
        return [Select Name,genres__c,poster__c,overview__c,created_by__c from TvShow__c];
    }

}