users = ["Dev", "John","Safari"]

data = ["One", 1, True]

emptyList = []

print(users[0])
print(users[-1])

print(users.index("John"))
print(users[:1])
users.extend(["ONE", "TWO", "THREE"])
print(users)
users += ["FOUR", "FIVE", "SIX"]
print(users)
users.extend(data)
print(users)
users.insert(0, "Bob")
users[2:4] = ["Eddie","Alex"]
print(users)

# REMOVIGN FROM LIST
users.remove("Bob")
print(users )
users.pop()
print(users)
del users[4]
print(users)
# users.clear()
# print(users)
users.sort(key=str)
print(users)

nums = [0,1,2,3,4,5,6,7,8,9]
nums.reverse()
print(nums)
nums.sort(reverse=True)
print(nums)
print(sorted(nums,reverse=True))

numsCopy = nums.copy()
myNums = list(nums)
myCopy = nums[:]
print(sorted(myCopy,reverse=False))

users = list(["raju",231, False])
print(users)

