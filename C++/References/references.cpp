#include <iostream>
#include <string>

int main(){
    
    std::string food = "PIZZA";
    std::string &meal = food;

    std::cout << food << std::endl;
    std::cout << meal << std::endl;
    std::cout << &meal << std::endl;


}