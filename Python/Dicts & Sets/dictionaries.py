user = {
    "name":"John",
    "branch":"EEE",
    "email":"john@deo.com",
    "age":23,
    "is_verified":True
}

band = dict(name="AC/DC", country="Australia", members=4)

print(user.get("name"))
print(user.keys())
print(user.values())
print(user.items())

user['email'] = "john@deo.com"
print(user)
user.update({"email":"deo@john.com"})
print(user)


print(user.pop("is_verified"))
print(user)

print(user.popitem())
print("user",user)

print(user)

user.clear()
print(user)
