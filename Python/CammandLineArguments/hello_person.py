

def hello(name, lang):
    greetings = {
        "English": "Hello",
        "Spanish": "Hola", 
        "German": "Hallo",
        "French": "Bonjour",
        "Italian": "Ciao",
        "Portuguese": "Olá",
        "Dutch": "Hallo"
    }
    msg = f"{greetings[lang]}, {name}!"
    print(msg)
    return msg


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Provides a personalized greeting"
    )

    parser.add_argument(
        "-n", "--name", metavar="name",
        required=True, help="The name of the person to greet"
    )

    parser.add_argument(
        "-l", "--lang", metavar="language",
        required=True, choices=["English", "Spanish", "German", "French", "Italian", "Portuguese", "Dutch"],
        help="The language of the greeting"
    )

    args = parser.parse_args()

    hello(args.name, args.lang)
