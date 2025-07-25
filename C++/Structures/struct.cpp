#include <iostream>
#include <string>

struct Student {
    std::string name;
    int no;
    std::string branch;
};

int main(){
    Student std1;
    std1.name = "John Deo";
    std1.no = 31;
    std1.branch = "EEE";

    std::cout << "Hello, I am" << std1.name << std1.branch << std1.no;
}