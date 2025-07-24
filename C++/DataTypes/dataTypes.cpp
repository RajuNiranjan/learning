#include <iostream>
#include <typeinfo>
#include <string>

int main(){
    const char ch[2] = "A";
    std::string name = "John Deo";
    int age = 22;
    double gpa = 7.01;
    bool hostler = false;

    std::cout << "Hello, I am " << name << ", I'm " << age << "Old" << "and my cpga is " << gpa << std::endl << std::endl;

    std::cout << typeid(ch).name() << std::endl;     
    std::cout << typeid(name).name() << std::endl;     
    std::cout << typeid(age).name() << std::endl;     
    std::cout << typeid(gpa).name() << std::endl;     
    std::cout << typeid(hostler).name() << std::endl;     

    std::cout << std::endl;
    std::cout << "Using the auto keyword" << std::endl;
    std::cout << std::endl;


    auto name1 = "John Deo";
    auto age1 = 22;
    auto gpa1 = 7.01;
    auto hostler1 = false;


    std::cout << typeid(name1).name() << std::endl;     
    std::cout << typeid(age1).name() << std::endl;     
    std::cout << typeid(gpa1).name() << std::endl;     
    std::cout << typeid(hostler1).name() << std::endl;     

}