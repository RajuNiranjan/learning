queue = []

queue.append(10)
queue.append(20)
queue.append(30)
queue.append(40)

print(queue)

queue.pop(0)
queue.pop(0)
queue.pop(0)

print(queue)

# inserting element on one side (left) and removing element from another side (right)

queue1 = []

queue1.insert(0,1)
queue1.insert(0,2)
queue1.insert(0,3)
queue1.insert(0,4)

print(queue1)


queue1.pop()
queue1.pop()

print(queue1)
