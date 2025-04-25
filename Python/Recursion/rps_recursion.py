import random
from enum import Enum

def play_rps():

    class RPS(Enum):
        ROCK=1
        PAPER=2
        SCISSORS=3

    playersChoice = int(input("Enter ...\n1 for Rock \n2 for Paper \n3 for Scissors \nChoice: "))

    if playersChoice not in (1, 2, 3):
        print("Please choose the values 1, 2, 3 only.")
        return play_rps()

    computerChoice = random.randint(1, 3)

    print("=====================")
    print("   Game starts Now   ")
    print("")

    print(f'You Chose: {RPS(playersChoice).name}')
    print(f'Computer Chose: {RPS(computerChoice).name}')
    print("")
    print("")

    if playersChoice == computerChoice:
        print("Game Draw 🪢")
    elif (playersChoice == 1 and computerChoice == 3) or (playersChoice == 2 and computerChoice == 1) or (playersChoice == 3 and computerChoice == 2):
        print("You Win 🥳")
    else:
        print("You Lose 🤦‍♂️")

    while True:
        playAgain = input("Play again ? (y/q) : \t")
        if playAgain.lower() not in ('y', 'q'):
            continue
        else:
            break

    if playAgain.lower() == "y":
        return play_rps()
    
    print("")
    print("   Game Over Now   ")
    print("=====================")

play_rps()