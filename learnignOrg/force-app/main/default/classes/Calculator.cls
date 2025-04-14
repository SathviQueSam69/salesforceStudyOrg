public class Calculator {
    //Method to add two integers
    public Integer add(Integer a, Integer b){
        return a+b;
    }
    //Overloaded method to add 3 integers
    public Integer add(Integer a, Integer b, Integer c){
        return a + b + c;
    }
    //Overloaded method to add two decimals
    public Decimal add(Decimal a, Decimal b){
        return a + b;
    }
    //Overloaded method to add a string and an integer
    public String add(String a, Integer b){
        return a + String.valueOf(b);
    }
    

}