import random
from enum import Enum

def rps(name="PlayerOne"):
    game_count = 0
    draw_count = 0
    player_wins = 0
    computer_wins = 0

    def play_rps():
        nonlocal name
        nonlocal game_count
        nonlocal player_wins
        nonlocal computer_wins
        nonlocal draw_count

        class RPS(Enum):
            ROCK=1
            PAPER=2
            SCISSORS=3

        playersChoice = int(input(f"{name} please enter ...\n1 for Rock \n2 for Paper \n3 for Scissors \nChoice: "))

        if playersChoice not in (1, 2, 3):
            print(f"{name} please choose the values 1, 2, 3 only.")
            return play_rps()

        computerChoice = random.randint(1, 3)

        print("=====================")
        print("   Game starts Now   ")
        print("")

        print(f'You Chose: {RPS(playersChoice).name}')
        print(f'Computer Chose: {RPS(computerChoice).name}')
        print("")
        print("")

        def decide_winner(playersChoice, computerChoice):
            nonlocal name
            if playersChoice == computerChoice:
                nonlocal draw_count
                draw_count += 1
                return f"{name} Game Draw 🪢"
            elif (playersChoice == 1 and computerChoice == 3) or (playersChoice == 2 and computerChoice == 1) or (playersChoice == 3 and computerChoice == 2):
                nonlocal player_wins
                player_wins += 1
                return f"{name} You Win 🥳"
            else:
                nonlocal computer_wins
                computer_wins += 1
                return f"{name} You Lose 🤦‍♂️"
        
        game_result = decide_winner(playersChoice, computerChoice)

        print(game_result)

        nonlocal game_count
        game_count += 1

        print(f"\nGame count: {game_count}")
        print(f"\n{name}'s wins: {player_wins}")
        print(f"\nComputer wins: {computer_wins}")
        print(f"\nDraw count: {draw_count}")

        while True:
            playAgain = input(f"{name} Play again ? (y/q) : \t")
            if playAgain.lower() not in ('y', 'q'):
                continue
            else:
                break

        if playAgain.lower() == "y":
            return play_rps()
        
        print("")
        print("   Game Over Now   ")
        print("=====================")

    return play_rps


if __name__ == "__main__":

    import argparse

    parser = argparse.ArgumentParser(
        description="Provides a personalized greeting"
    )

    parser.add_argument(
        "-n", "--name", metavar="name",
        required=True, help="The name of the person to greet"
    )

    args = parser.parse_args()

    play_rps = rps(args.name)
    play_rps()