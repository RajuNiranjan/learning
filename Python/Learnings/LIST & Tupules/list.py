users = ["John", "Jane", "Jim", "Jill", "A", "j",  "z"]

print("users", users),
print("typeof", type(users))
print("Jim", users[2])
print("Jill" in users)
print("index of Jim", users.index("Jim"))
print("range", users[:2])

users.append("Raju")
print("append", users)

users += ["OKP", "Mila"]
print("extend", users)

users.insert(0, "Wilson")
print("insert", users)

users.insert(0, "Niranjan")
print("insert", users)

users.remove("Raju")
print("remove", users)

users.pop()
print("pop", users)

del users[0]
print("del", users)

users.sort()
print("sort", users)

users.sort(key=str.lower)
print("sort lower", users)

users.reverse()
print("reverse", users)


users.clear()
print("clear", users)

num = [1, 2, 8, 9, 10, 3, 4, 5, 6, 7,]

print("num", num)

print("sum", sum(num))

print("max", max(num))

num.reverse()
print("reverse", num)

num.sort()
print("sort", num)

num.sort(reverse=True)
print("sort reverse", num)

numCopy = num.copy()
print("numCopy", numCopy)

# TUPUL

myTuple = ("Max", 28, "New York")
print("myTuple", myTuple)

myTuple2 = tuple(["Max", 28, "New York"])
print("myTuple2", myTuple2)

print("type of myTuple", type(myTuple))
print("type of myTuple2", type(myTuple2))


newTuple = myTuple + ("LA",)
print("new tuple", newTuple)









