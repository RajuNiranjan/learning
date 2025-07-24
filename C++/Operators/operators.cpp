#include <iostream>

int main(){
    int x;
    int y;
    std::cout << "Enter x value: ";
    std::cin >> x;
    std::cout << "Enter y value: ";
    std::cin >> y;
    
    int sum = x + y;
    int sub = x - y;
    int mult = x * y;
    int div = x / y;
    int mod = x % y;
    
    std::cout << std::endl;
    std::cout << "Arthemetic" << std::endl;
    std::cout << std::endl;
    std::cout << "SUM " << sum << std::endl;
    std::cout << "SUB " << sub << std::endl;
    std::cout << "MULT " << mult << std::endl;
    std::cout << "DIV " << div  << std::endl;
    std::cout << "MOD " <<  mod << std::endl;

    std::cout << std::endl;
    std::cout << "Comparisions" << std::endl;
    std::cout << std::endl;
    std::cout << "== " << (x == y) << std::endl;
    std::cout << "!= " << (x != y) << std::endl;
    std::cout << "> " << (x > y) << std::endl;
    std::cout << "< " << (x < y)  << std::endl;
    std::cout << ">= " <<  (x >= y) << std::endl;
    std::cout << "<= " <<  (x <= y) << std::endl;
    
}