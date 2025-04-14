@IsTest
public class CalculatorTest {
    static testMethod void testadd(){
        Calculator c = new Calculator();
        c.add(10, 15);
        
    }
    static testMethod void testadd1(){
        Calculator c = new Calculator();
        c.add(10, 15,23);
        
    }
    static testMethod void testaddD(){
        Calculator c = new Calculator();
        c.add(1.0, 1.5);
        
    }
    static testMethod void testaddS(){
        Calculator c = new Calculator();
        c.add('Number:', 13);
        
    }

}