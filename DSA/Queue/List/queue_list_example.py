class Queue:
    def __init__(self):
        self.queue = []

    def enqueue(self, element):
        self.queue.append(element)
        print(f"{element} is added to the queue!")

    def dequeue(self):
        if not self.queue:
            print("Queue is empty!")
        else:
            e = self.queue.pop(0)
            print(f"Removed element: {e}")

    def display(self):
        if not self.queue:
            print("Queue is empty!")
        else:
            print("Current Queue:", self.queue)


def main():
    q = Queue()

    while True:
        print("\nSelect an option:")
        print("1. Add")
        print("2. Remove")
        print("3. Show")
        print("4. Quit")

        try:
            choice = int(input("Enter your choice: "))
        except ValueError:
            print("Invalid input! Please enter a number (1-4).")
            continue

        if choice == 1:
            element = input("Enter element: ")
            q.enqueue(element)
        elif choice == 2:
            q.dequeue()
        elif choice == 3:
            q.display()
        elif choice == 4:
            print("Exiting... Goodbye!")
            break
        else:
            print("Enter a valid option (1-4).")


if __name__ == "__main__":
    main()
