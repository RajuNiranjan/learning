import queue

q = queue.Queue()

q.put(10)
q.put(20)
q.put(30)
q.put(40)
q.put(50)

print(list(q.queue))


q.get()
q.get()
q.get()

print(list(q.queue))