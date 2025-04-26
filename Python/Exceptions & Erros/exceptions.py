x = "2"  # Changed to string to avoid TypeError

try:
    if not type(x) is str:
        raise TypeError("Only strings are allowed")
    num = int(x)
    print(num / 0)
except NameError:
    print("x is not defined")
except ValueError:
    print("Could not convert string to number")
except ZeroDivisionError:
    print("You can't divide by zero") 
except Exception as error:  # Fixed typo in variable name
    print(f"An error occurred: {error}")
else:
    print("No errors")
finally:
    print("This will always run")
