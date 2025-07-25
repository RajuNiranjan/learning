#include <iostream>

void greet(){
    std::cout << "Good Morning!" << std::endl;
};


void sum(int a, int b){
    std::cout << (a + b) << std::endl;
};

void mult(int a = 5, int b = 2){
    std::cout << (a * b) << std::endl;
};

int main(){
    greet();

    sum(2, 3);

    mult(2, 2);
};