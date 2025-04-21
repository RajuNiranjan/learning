name = "John"
count = 1

def greet(firstName):
    print(f"Hello, my first name is" + firstName)
    color = 'Red'
    print("My favorite color is " + color)  # Local variable
    print("My last name is " + name)  # Global variable


greet("Ramu")

print('--------------------------------')
print('--------------------------------')
print('--------------------------------')
def another():

    color = 'Blue'
    global count
    count += 2
    print("global count", count)

    def greet(firstName):
        # nonlocal color
        color = 'Green'
        print(f"Hello, my first name is {firstName}")
        print(f"My favorite color is {color}")  # Local variable
        print(f"My last name is {name}")  # Global variable


    greet("Wilson")

another()