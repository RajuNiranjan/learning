


# def greet(name):
#     print(f"Hello {name}")

# greet("John")

# def sum(a, b):
#     return a + b

# print(sum(3, 4))

def multiple_items(*args):
    print(args)
    print(type(args))

multiple_items(1,2,3,4,5)

def mult_named_items(**kwargs):
    print(kwargs)
    print(type(kwargs))

mult_named_items(name="John", age=25, city="New York")



