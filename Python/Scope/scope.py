


name = "John"
count = 0

def greet():
    name = "Jane"
    # global count

    def inner_name():
        nonlocal name
        name = "Wilson"
        print(f"inner_name: {name}")

    inner_name()
    print(f"greet: {name}")

    global count
    count += 1
    print(f"count: {count}")
    print(f"Hello, {name}")

greet()



