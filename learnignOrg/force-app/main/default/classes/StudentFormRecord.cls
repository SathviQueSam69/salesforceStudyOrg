// RecordFormController.apxc
public with sharing class StudentFormRecord {
    @AuraEnabled
    public static void createRecord(Student__c record) { // Replace YourCustomObject__c
        try {
            insert record;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}