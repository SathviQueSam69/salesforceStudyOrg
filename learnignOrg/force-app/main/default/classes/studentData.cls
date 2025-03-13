public class studentData {
    @AuraEnabled(cacheable=true)
    public static List<Student__c> getRecords() {
        return [SELECT Id, Name, Age__c, Phone__c FROM Student__c]; // Replace with your object and fields
    }

}