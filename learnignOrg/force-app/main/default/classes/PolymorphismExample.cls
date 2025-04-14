public class PolymorphismExample {
    
    public static void demoPolymorphism(){
        Animal a1 = new Dog();
        Animal a2 = new Cat();
        Animal anim = new Animal();
    
    a1.makeSound();
    a2.makeSound();
    anim.makeSound();
    
    List<Animal> animalList = new List<Animal>();
    animalList.add(new Dog());
    animalList.add(new Animal());
    
    for(Animal animal : animalList){
        animal.makeSound();
    }
    }
    

}