#include <iostream>

int main(){
    int n;
    std::cout << "Enter a number: ";
    std::cin >> n;

    for(int i = 1; i <= n; i++){
        for(int j = 1; j <= i; j++){
            std::cout << "* " ;
        }
        std::cout << std::endl;
    }
}