
stack = []

stack.append(10)
stack.append(20)
stack.append(30)

print("added items", stack)

print("lenght of the stack", len(stack))

print("Length of the stack is Empty or Not", not stack)

print("accessing the late entered element from stack",stack[-1])

stack.pop()
stack.pop()

print("removed items", stack)

