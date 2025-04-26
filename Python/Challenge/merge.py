import argparse
from rps_cammand_line_Arguements import rps
from guess_number import guess_number

def play_game(name="John Deo"):
    welcome_back = 0

    while True:
        if welcome_back == 1:
            print(f"Welcome back {name}! Let's play a game!")

        try:
            player_choice = input(f"{name} choose a game \n1 for Rock Paper Scissors \n2 for Guess the Number \nx to Exit \nChoice: ")

            if player_choice.lower() == 'x':
                print(f"Thanks for playing {name}!")
                break

            player_choice = int(player_choice)

            if player_choice not in [1, 2]:
                print(f"{name} please enter a valid choice")
                continue

            if player_choice == 1:
                play_rps = rps(name)
                play_rps()

            if player_choice == 2:
                play_guess_number = guess_number(name)
                play_guess_number()
            
            welcome_back = 1

        except ValueError:
            print(f"{name} please enter a valid choice")
            continue


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="This is a game of Rock Paper Scissors and Guess the Number"
    )

    parser.add_argument(
        '-n',
        '--name',
        metavar="name",
        required=True,
        help="The name of the person playing the game"
    )

    args = parser.parse_args()

    print(f'Welcome {args.name}!')

    play_game(args.name)
