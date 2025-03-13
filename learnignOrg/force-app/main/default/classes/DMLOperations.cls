public class DMLOperations {
    
    public static void deleteAccounts(){
        List<Student__c> accs = [Select Id from Student__c Where Name = 'Luke'];
        delete accs;
    }
    public static void insertAccounts(){
        List<Student__c> student = new List<Student__c>();
        Student__c st = new Student__c();
        student.add(st);
        insert student;//using DML Statements
        Database.insert(student);//using Database methods
       
    }
    public static void updateAccounts(){
        List<Student__c> student = [Select Name,Age__c from Student__c];
        for(Student__c stu:student){
            stu.Age__c = 18;
        }
        update student;
        Database.update(student,false);
        
    }
   public static void undeleteAccounts(){
       List<Student__c> student = [Select Name,Age__c from Student__c Where isDeleted=true ALL ROWS ];
       undelete student;
                                     
   }

}