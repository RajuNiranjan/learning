squre = lambda num: num * num

print(squre(5))

addTwo = lambda a, b: a + b
print(addTwo(10, 20))


###################################################################

def func_builder(x):
    return lambda n: n + x

sum = func_builder(10)

print(sum(5))





num = [3, 4,2, 9, 1, 35]

square_num = map(lambda x: x * x, num)

print(list(square_num))

div = filter(lambda x: x % 2 != 0, num)

print(list(div))




