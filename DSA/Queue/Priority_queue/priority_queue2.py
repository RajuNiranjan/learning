import queue

q = queue.PriorityQueue()

q.put(40)
q.put(10)
q.put(30)
q.put(20)
q.put(50)
q.put(10)

print(list(q.queue))

q.get()
q.get()
q.get()

print(list(q.queue))