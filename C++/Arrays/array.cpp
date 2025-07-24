#include <iostream>
#include <string>

int main(){
    int nums[5] = {1, 2, 3, 4, 5};
    std::string names[5] = {"one", "two", "three", "four", "five"};
    std::string name = "John Deo";
    int sum;

    std::string multDArray[2][2] = {
        {"One", "Two"},
        {"Three", "Four"}
    };


    std::cout << std::endl;

    for(int n: nums){
        std::cout << n << std::endl;
    }
    std::cout << std::endl;

    for(std::string n: names){
        std::cout << n << std::endl;
    }
    std::cout << std::endl;

    for(int i = 0; i < name.size(); i++){
        std::cout << name[i] << std::endl;
    }
    std::cout << std::endl;


    for(int n: nums){
        sum += n;
    }

    std::cout << sum << std::endl;

    std::cout << std::endl;
    
    std::cout << multDArray[1][0] << std::endl;

}