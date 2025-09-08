import queue

stack = queue.LifoQueue()

stack.put(10)
stack.put(20)
stack.put(30)
stack.put(40)

print(stack)

stack.get()
stack.get()
stack.get()

print(stack)