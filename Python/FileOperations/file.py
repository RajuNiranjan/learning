import os

# READING FILES

# f = open("names.txt", "r")


# print(f.read(6))
# print(f.readline())

# for line in f:
#     print(line)

# f.close()

# try:
#     f = open("names.txt")
#     print(f.read())
# except FileNotFoundError:
#     print("File does not exist")
# finally:
#     f.close()


# Appending to files


# f = open('names.txt', 'a')
# f.write("\nNeil")
# f.close()
# f = open("names.txt")
# print(f.read())
# f.close()


# Write (Over write)
# f = open("context.txt", "w")
# f.write("I deleted all the context of the file")
# f.close()

# # Create a new file
# f = open("context.txt", "r")
# print(f.read())
# f.close()

# Create a new file
# f = open("text.txt", "x")
# f.write("Hello, World!")
# f.close()


# file already exists while it is created


# if not os.path.exists('text.txt'):
#     with open("text.txt", "w") as f:
#         f.write("Hello, World!")
# else:
#     print("File already exists")


# Delete a file

# if os.path.exists('text.txt'):
#     os.remove('text.txt')
# else:
#     print("File does not exist")


with open("text.txt",'w') as f:
    f.write("Hello, World!")
