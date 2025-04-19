# Loops

# -WHILE LOOP 
# - FOR LOOP

# - WHILE LOOP
value = 0
# while value < 10:
#     print(value)
#     if value ==5:
#         break
#     value += 1

# while value < 10:
#     value += 1
#     if value == 5:
#         continue
#     print(value)
    
    
# - FOR LOOP

# names = ["John", "Jane", "Jim", "Jill"]

# for name in names:
#     print(name)

# for x in "MISSING":
#     print(x)

# for x in names:
#     if x == "John":
#         break
#     print(x)

# for x in names:
#     if x == "John":
#         continue
#     print(x)

# for i in range(10):
#     print(i)

# for i in range(2, 12):
#     print(i)

# for i in range(0, 10, 3):
#     if i % 2 == 0:
#         print(i, "even")

# for i in range(10, 0, -1):
#     print(i)

names = ["John", "Jane", "Jim", "Jill"]
branches = ["IT", "HR", "Sales", "Marketing"]

# for name in names:
#     for branch in branches:
#         print(name, branch)


for name in names:
    for branch in branches:
        print(name, branch)