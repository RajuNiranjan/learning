
import random
from enum import Enum

class RPS(Enum):
    ROCK=1
    PAPER=2
    SCISSORS=3

playersChoice = int(input("Enter ...\n1 for Rock \n2 for Paper \n3 for Sciesors \nChoice: "))

if playersChoice < 1 or playersChoice > 3:
    print("Please choose the values 1, 2, 3 only.")

computerChoice = int(random.choice('123'))


print("=====================")
print("   Game starts Now   ")
print("")

print(f'You Choosen: {RPS(playersChoice).name}')
print(f'You Choosen: {RPS(computerChoice).name}')
print("")
print("")

if playersChoice == computerChoice:
    print("Game Draw 🪢")
elif (playersChoice == 1 and computerChoice == 3) or (playersChoice == 2 and computerChoice == 1) or (playersChoice == 3 and computerChoice == 2):
    print("You Win 🥳")
else: 
    print("You Lose 🤦‍♂️")

print("")
print("   Game Over Now   ")
print("=====================")