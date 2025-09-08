stack = []

def push():
    element = input("Enter the element: ")
    stack.append(element)
    print(stack)

def pop_element():
    if not stack:
        print("Stack is empty!")
    else:
        e = stack.pop()
        print(f"Removed element: {e}")
        print(stack)

while True:
    print("\nSelect the operation: 1. Push  2. Pop  3. Quit")
    try:
        choice = int(input("Enter choice: "))
    except ValueError:
        print("Please enter a number!")
        continue

    if choice == 1:
        push()
    elif choice == 2:
        pop_element()
    elif choice == 3:
        print("Exiting...")
        break
    else:
        print("Enter the correct operation!")
