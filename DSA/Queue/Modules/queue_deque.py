import collections

q = collections.deque()

print(q)

q.appendleft(10)
q.appendleft(20)
q.appendleft(30)
q.appendleft(40)
q.appendleft(50)

print(q)


q.pop()
q.popleft()
q.pop()

print(q)

