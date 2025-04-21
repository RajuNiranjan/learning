
def parent_fun(person):
    coins= 3

    def play_game():
        nonlocal coins
        coins -= 1

        if coins > 1:
            print(f"{person} has {coins} coins left")
        elif coins == 1:
            print(f"{person} having {coins} coin left")
        else:
            print(f"{person} has no coins left")

    return play_game

tommy = parent_fun("Tommy")
jenny = parent_fun("Jenny")

tommy()
tommy()
tommy()

jenny()
jenny()
jenny()


