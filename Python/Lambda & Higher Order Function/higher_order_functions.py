from functools import reduce


lambda acc, curr: acc + curr

nums = [2, 33, 41, 12, 9,] 

total = reduce(lambda acc, curr: acc + curr, nums)

print(total)



print(sum(nums, 10))

names = ['John', 'Jane', 'Jim', 'Jill']

char_count = reduce(lambda acc, curr: acc + len(curr), names,0)

print("char_count", char_count)
