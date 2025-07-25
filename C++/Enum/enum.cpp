#include <iostream>

enum Status {
    PENDING = 10,
    FULLFIL = 20,
    REJECTED = 30
};

int main(){
    Status status = REJECTED;

    std::cout << status;
}