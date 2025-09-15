class Node:
    def __init__(self, data):
        self.data = data
        self.nref = None  # next reference


class CLL:
    def __init__(self):
        self.head = None

    # ---------- Traversals ----------
    def display(self):
        if self.head is None:
            print("CLL is Empty")
            return

        n = self.head
        while True:
            print(n.data, end=" -> ")
            n = n.nref
            if n == self.head:
                break
        print("(head)")

    # ---------- Insert Operations ----------
    def insert_empty(self, data):
        if self.head is not None:
            print("CLL is not empty")
            return
        new_node = Node(data)
        new_node.nref = new_node
        self.head = new_node

    def add_begin(self, data):
        if self.head is None:
            self.insert_empty(data)
            return
        new_node = Node(data)
        tail = self.head
        while tail.nref != self.head:
            tail = tail.nref
        new_node.nref = self.head
        tail.nref = new_node
        self.head = new_node

    def add_end(self, data):
        if self.head is None:
            self.insert_empty(data)
            return
        new_node = Node(data)
        tail = self.head
        while tail.nref != self.head:
            tail = tail.nref
        tail.nref = new_node
        new_node.nref = self.head

    def add_after(self, data, x):
        if self.head is None:
            print("CLL is empty")
            return
        n = self.head
        while True:
            if n.data == x:
                new_node = Node(data)
                new_node.nref = n.nref
                n.nref = new_node
                return
            n = n.nref
            if n == self.head:
                break
        print(f"{x} is not found in CLL")

    def add_before(self, data, x):
        if self.head is None:
            print("CLL is empty")
            return
        # if x is at head
        if self.head.data == x:
            self.add_begin(data)
            return

        prev = None
        n = self.head
        while True:
            if n.data == x:
                new_node = Node(data)
                new_node.nref = n
                prev.nref = new_node
                return
            prev = n
            n = n.nref
            if n == self.head:
                break
        print(f"{x} is not found in CLL")

    # ---------- Delete Operations ----------
    def remove_begin(self):
        if self.head is None:
            print("CLL is empty")
            return

        if self.head.nref == self.head:  # single node
            self.head = None
            return

        tail = self.head
        while tail.nref != self.head:
            tail = tail.nref
        tail.nref = self.head.nref
        self.head = self.head.nref

    def remove_end(self):
        if self.head is None:
            print("CLL is empty")
            return

        if self.head.nref == self.head:
            self.head = None
            return

        prev = None
        n = self.head
        while n.nref != self.head:
            prev = n
            n = n.nref
        prev.nref = self.head

    def remove_value(self, x):
        if self.head is None:
            print("CLL is empty")
            return

        if self.head.data == x:
            self.remove_begin()
            return

        prev = None
        n = self.head
        while True:
            if n.data == x:
                prev.nref = n.nref
                return
            prev = n
            n = n.nref
            if n == self.head:
                break
        print(f"{x} is not found in CLL")


# -------------------- Menu Driver --------------------
if __name__ == "__main__":
    cl = CLL()

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
                "0. exit\n"
                "Enter choice: "
            )
        )

        if choice == 1:
            n = int(input("Enter value to add at begin: "))
            cl.add_begin(n)
        elif choice == 2:
            n = int(input("Enter value to add at end: "))
            cl.add_end(n)
        elif choice == 3:
            n = int(input("Enter new value: "))
            x = int(input("Insert after which existing value: "))
            cl.add_after(n, x)
        elif choice == 4:
            n = int(input("Enter new value: "))
            x = int(input("Insert before which existing value: "))
            cl.add_before(n, x)
        elif choice == 5:
            cl.remove_begin()
        elif choice == 6:
            cl.remove_end()
        elif choice == 7:
            x = int(input("Enter value to remove: "))
            cl.remove_value(x)
        elif choice == 8:
            cl.display()
        elif choice == 0:
            print("Exiting...")
            break
        else:
            print("Invalid choice!")
