class Node:
    def __init__(self, data):
        self.data = data
        self.ref = None


class LL:
    def __init__(self):
        self.head = None

    def display(self):
        if self.head is None:
            print("List is empty")
            return
        n = self.head
        while n is not None:
            print(n.data, end=" -> ")
            n = n.ref
        print("Null")

    def add_begin(self, data):
        new_node = Node(data)
        new_node.ref = self.head
        self.head = new_node

    def add_end(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            n = self.head
            while n.ref is not None:
                n = n.ref
            n.ref = new_node

    def add_after(self, data, x):
        if self.head is None:
            print("List is empty")
            return
        n = self.head
        while n is not None:
            if n.data == x:
                new_node = Node(data)
                new_node.ref = n.ref
                n.ref = new_node
                return
            n = n.ref
        print(f"{x} not found in list")

    def add_before(self, data, x):
        if self.head is None:
            print("List is empty")
            return
        if self.head.data == x:
            self.add_begin(data)
            return
        n = self.head
        while n.ref is not None:
            if n.ref.data == x:
                new_node = Node(data)
                new_node.ref = n.ref
                n.ref = new_node
                return
            n = n.ref
        print(f"{x} not found in list")

    def insert_empty(self, data):
        if self.head is None:
            self.head = Node(data)
        else:
            print("List is not empty")

    def remove_begin(self):
        if self.head is None:
            print("List is empty")
        else:
            self.head = self.head.ref

    def remove_end(self):
        if self.head is None:
            print("List is empty")
            return
        if self.head.ref is None:
            self.head = None
            return
        n = self.head
        while n.ref.ref is not None:
            n = n.ref
        n.ref = None

    def remove_value(self, x):
        if self.head is None:
            print("List is empty")
            return
        if self.head.data == x:
            self.head = self.head.ref
            return
        n = self.head
        while n.ref is not None:
            if n.ref.data == x:
                n.ref = n.ref.ref
                return
            n = n.ref
        print(f"{x} not found in list")


# ----------------- Menu -----------------
l = LL()

while True:
    choice = int(
        input(
            "\nChoose operation:\n"
            "1. add_begin\n"
            "2. add_end\n"
            "3. add_after\n"
            "4. add_before\n"
            "5. remove_begin\n"
            "6. remove_end\n"
            "7. remove_value\n"
            "8. display\n"
            "9. exit\n"
            "Enter choice: "
        )
    )

    if choice == 1:
        n = int(input("Enter value to add at begin: "))
        l.add_begin(n)
    elif choice == 2:
        n = int(input("Enter value to add at end: "))
        l.add_end(n)
    elif choice == 3:
        n = int(input("Enter new value: "))
        x = int(input("Enter existing value to insert after: "))
        l.add_after(n, x)
    elif choice == 4:
        n = int(input("Enter new value: "))
        x = int(input("Enter existing value to insert before: "))
        l.add_before(n, x)
    elif choice == 5:
        l.remove_begin()
    elif choice == 6:
        l.remove_end()
    elif choice == 7:
        x = int(input("Enter value to remove: "))
        l.remove_value(x)
    elif choice == 8:
        l.display()
    elif choice == 9:
        print("Exiting...")
        break
    else:
        print("Invalid choice!")
