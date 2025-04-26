

def parent_function(person):
    coins = 3

    def play_game():
        nonlocal coins
        coins -= 1
        if coins > 0:
            print(f"{person} has {coins} coins left")
        else:
            print(f"{person} is out of coins")

    return play_game


play_game = parent_function("John")

play_game()
play_game()
play_game()


