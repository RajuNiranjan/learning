import sys
import random
from enum import Enum

def play_rps():
    class RPS(Enum):
        ROCK = 1
        PAPER = 2
        SCISSORS = 3


    playerChoice = input("Enter ... \n ROCK \n PAPER \n SCISSORS \n\n : ").upper()

    if playerChoice not in ["ROCK", "PAPER", "SCISSORS"]:
        print("Invalid input! Please try again.")
        play_rps()
        return

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
        play_rps()
    else:
        print("Thank you for playing!")
        playAgain = False

play_rps()
