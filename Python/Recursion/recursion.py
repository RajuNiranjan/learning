# def add_one(num):
#     if num > 9:
#         return num + 1
    
#     total = num + 1
#     print(total)
#     return add_one(total)

# add_one(0)

def sum(num=1):
    for i in range(num, 10):
        if i > 9:
            return i + 1
        total = i + 1
        print(total)
        return sum(total)
    
sum()




