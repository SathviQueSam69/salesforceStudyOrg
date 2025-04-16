public class AnimeRecords {
    
    @AuraEnabled(cacheable=true)
    public static List<Anime__c> getRecords(){
        
        return [Select Name,genre__c,overview__c,episodes__c,rating__c,poster__c from Anime__c];
    }

}