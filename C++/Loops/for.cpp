#include <iostream>

int main(){
    int n;
    std::cout << "Enter a number: ";
    std::cin >> n;

    for(int i = 0; i <= n; i++){
        std::cout << i << std::endl;
    }

    std::cout << std::endl;
    for(int i = 1; i <=10; i++){
        std::cout << n << " * " << i << " = " << (n * i) << std::endl;
    }
}