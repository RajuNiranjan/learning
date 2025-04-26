import random

def guess_number(name="John Deo"):
    game_count = 0
    player_wins = 0

    def play_guess_number():
        nonlocal name
        nonlocal player_wins
        nonlocal game_count

        try:
            player_guess = int(input(f"{name} please select a number in between 1, 10: "))
        except ValueError:
            print(f"{name} please enter a valid number")
            return play_guess_number()

        if player_guess not in range(1, 11):
            print(f"{name} please select a number in between 1, 10")
            return play_guess_number()
        
        computer_guess = random.randint(1, 10)

        def check_guess(player_guess, computer_guess):
            nonlocal player_wins

            if player_guess == computer_guess:
                player_wins += 1
                return f"You win {name}! The number was {computer_guess}. You have won {player_wins} times"
            else:
                return f"You lose {name}! The number was {computer_guess}. You have won {player_wins} times"
            
        game_result = check_guess(player_guess, computer_guess)
        game_count += 1

        print(game_result)

        print(f'{name} you have played {game_count} games and guessed correctly {player_wins} times')

        while True:
            play_again = input(f"{name} would you like to play again? (y/n): ").lower()
            if play_again in ['y', 'n']:
                break

        if play_again == 'y':
            return play_guess_number()
        else:
            print(f"Thanks for playing {name}!")

    return play_guess_number


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="This is a game of guess the number"
    )

    parser.add_argument(
        '-n',
        '--name',
        metavar="name",
        required=True,
        help="The name of the person playing the game"
    )

    args = parser.parse_args()

    guess_my_number = guess_number(args.name)
    guess_my_number()
