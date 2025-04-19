#  DICTIONARIES

band = {
    "vocals":"Plant",
    "guitar":"Page",
}

band2 = dict(vocals="Plant", guitar="Page")

print("Band", band)
print("Band2", band2)

print(band["guitar"])
print(band.get("vocals"))
print(band2.keys())
print(band2.values())
print(band.items())
print('guitar' in band)
band["vocals"] = "Coverdale"
print(band)
band.update({"drums":"Bonham"})
print(band)
print(band.pop("drums"))
print(band)
print(band.popitem())
print(band)
band.clear()
print(band)

# nested dictionaries

num1 = {
    "name": "John",
    "age": 20,
    "city": "New York"
}

num2 = {
    "name": "Jane",
    "age": 21,
    "city": "Los Angeles"
}

users = {
    "user1": num1,
    "user2": num2
}

print(users)
