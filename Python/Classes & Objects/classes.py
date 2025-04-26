

class Vehicle:
    def __init__(self, name, color, price, type):
        self.name = name
        self.color = color
        self.price = price
        self.type = type

    def moves(self):
        print("Moves along...")
    
    def get_make(self):
        print(f"I'm a {self.type} {self.name} and I'm {self.color} and I cost ${self.price:,}")


my_car = Vehicle("BMW", "Red", 30000, "Car") 
your_car = Vehicle("Mercedes", "Blue", 40000, "Car")
    
my_car.get_make()
your_car.get_make()


class Airplane(Vehicle):
    def moves(self):
        print("Flies along...")
    

class Truck(Vehicle):
    def moves(self):
        print("Rumbles along...")


class Boat(Vehicle):
    def moves(self):
        print("Sails along...")


plane = Airplane("Boeing", "White", 1000000, "Airplane")
truck = Truck("Ford", "Red", 50000, "Truck")
boat = Boat("Yacht", "Black", 1000000, "Boat")

plane.moves()
plane.get_make()
truck.moves()
truck.get_make()
boat.moves()
boat.get_make()

print('\n\n')

for vehicle in (my_car, your_car, plane, truck, boat):
    vehicle.get_make()
    vehicle.moves()


