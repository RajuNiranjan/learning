import sys
import random
from enum import Enum

class RPS(Enum):
    ROCK = 1
    PAPER = 2
    SCISSORS = 3

playAgain =True

while playAgain:

    playerChoice = input("Enter ... \n ROCK \n PAPER \n SCISSORS \n\n : ").upper()

    if playerChoice not in [e.name for e in RPS]:
        sys.exit("You must choose ROCK, PAPER or SCISSORS")

    playerChoice = RPS[playerChoice]
    computerChoice = random.choice(list(RPS))

    print("")
    print("You chose " + playerChoice.name + ".")
    print("The computer chose " + computerChoice.name + ".")
    print("")

    if playerChoice == computerChoice:
        print("It's a tie!")
    elif playerChoice == RPS.ROCK and computerChoice == RPS.SCISSORS:
        print("You win!")
    elif playerChoice == RPS.PAPER and computerChoice == RPS.ROCK:
        print("You win!")
    elif playerChoice == RPS.SCISSORS and computerChoice == RPS.PAPER:
        print("You win!")
    else:
        print("You lose!")
    playAgain = input("Play again? [y/n] \n\n : ")
    if playAgain.lower() == "y":
       continue
    else:
        print("Thank you for playing!")
        playAgain = False
