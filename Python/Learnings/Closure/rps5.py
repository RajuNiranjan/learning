import sys
import random
from enum import Enum

def rps():
    game_count = 0
    player_wins = 0
    computer_wins = 0

    def play_rps():

        nonlocal player_wins
        nonlocal computer_wins

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

        def decide_winner(playerChoice, computerChoice):
            nonlocal player_wins
            nonlocal computer_wins

            if playerChoice == computerChoice:
                print("It's a tie!")
                return "Tie"
            elif playerChoice == RPS.ROCK and computerChoice == RPS.SCISSORS:
                player_wins += 1
                print("You win!")
                return "Win" 
            elif playerChoice == RPS.PAPER and computerChoice == RPS.ROCK:
                player_wins += 1
                print("You win!")
                return "Win"
            elif playerChoice == RPS.SCISSORS and computerChoice == RPS.PAPER:
                player_wins += 1
                print("You win!")
                return "Win"
            else:
                computer_wins += 1
                print("You lose!")
                return "Loss"

        winner = decide_winner(playerChoice, computerChoice)
        print(f"\nGame result: {winner}")

        nonlocal game_count
        game_count += 1
        print(f"\nGame count: {game_count}")

        playAgain = input("Play again? [y/n] \n\n : ")
        if playAgain.lower() == "y":
            play_rps()
        else:
            print("Thank you for playing!")
            print(f"\nFinal Game result: \nPlayer wins: {player_wins} \nComputer wins: {computer_wins}")
            playAgain = False

    play_rps()

rps()
