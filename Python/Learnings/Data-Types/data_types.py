### STRING DATA TYPE

# Literal Assignment

print("---- Literal Assignment ----")

firstName = "Niranjan"
lastName = "Raju"

print(type(firstName))
print((lastName == str))
print((isinstance(firstName, str)))


# Constructor Function

print("---- Constructor Function ----")

pizza = str("Pepperoni")
print(type(pizza))
print(type(pizza) == str)
print(isinstance(pizza, str))


# Concatenation

print("---- Concatenation ----")

firstName = "Rechi"
lastName = "Wilson"

fullName = firstName + " " + lastName
print(fullName + "!")


# Casting a number to a string

print("---- Casting a number to a string ----")

decade = str(1980)
print(type(decade))

statement = "I like rock music from the " + decade + "'s."
print(statement)

# Multiple lines

print("---- Multiple lines ----")

multiline = '''
Hey, how are you?

I was just checking in.


'''

print(multiline)

# Escape special characters

print("---- Escape special characters ----")

quotation = 'I\'m back at work! \tHey!\n\tWhere\'s this at \t\\located'
print(quotation)


# String methods

print("---- String methods ----")


print("Lower case: ", firstName.lower())
print("Upper case: ", firstName.upper())
print("Title case: ", firstName.title())
print("Replace: ", fullName.replace("Wilson", "Padaveeran"))
print("Length: ", len(multiline))
print("strip: ", len(multiline.strip()))
print("lstrip: ", len(multiline.lstrip()))
print("rstrip: ", len(multiline.rstrip()))


# Build A Menu

print("---- Build A Menu ----")


title = 'menu'.upper()

print(title.center(20, "="))

print("Coffee".ljust(16, ".") + "$1".rjust(4))
print("Muffin".ljust(16, ".") + "$2".rjust(4))
print("Cheesecake".ljust(16, ".") + "$3".rjust(4))
print("Pizza".ljust(16, ".") + "$4".rjust(4))





























