#include <iostream>
#include <string>

int main(){
    int age;
    std::cout << "Enter your age: ";
    std::cin >> age;
    
    if(age > 18){
        std::cout << "Eligible to Vote" << std::endl;
    }else if(age == 18){
        std::cout << "Still Eligible to vote" << std::endl;
    }else{
        std::cout << "Not Eligible to Vote" << std::endl;
    }


    std::string results = (age >= 18) ? "Eligible":"Not Eligible" ;

    std::cout << "Resule: " << results << std::endl;
}