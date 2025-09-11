class Node:
    def __init__(self, data):
        self.data = data
        self.pref = None
        self.nref = None

class DLL:
    def __init__(self):
        self.head = None
    
    def forward_traversal(self):
        if self.head is None:
            print("DLL is Empty")
        else:
            n = self.head
            while n is not None:
                print(n.data, end=" -> ")
                n = n.nref
            print("None")
    
    def backward_traversal(self):
        if self.head is None:
            print("DLL is Empty")
        else:
            n = self.head
            while n.nref is not None:
                n = n.nref
            while n is not None:
                print(n.data, end=" -> ")
                n = n.pref
            print("None")

    def insert_empty(self, data):
        if self.head is None:
            new_node = Node(data)
            self.head = new_node
        else:
            print("DLL is not empty")
                
    def add_begin(self, data):
        if self.head is None:
            self.insert_empty(data)
        else:
            new_node = Node(data)
            new_node.nref = self.head
            self.head.pref = new_node 
            self.head = new_node

    def add_end(self, data):
        if self.head is None:
            self.insert_empty(data)
        else:
            new_node = Node(data)
            n = self.head
            while n.nref is not None:
                n = n.nref
            n.nref = new_node
            new_node.pref = n

    def add_after(self, data, x):
        if self.head is None:
            print("DLL is empty")
            return
        
        n = self.head
        while n is not None:
            if n.data == x:
                new_node = Node(data)
                new_node.pref = n
                new_node.nref = n.nref

                if n.nref is not None:
                    n.nref.pref = new_node
                n.nref = new_node
                return
            n = n.nref

        print(f"{x} is not found in DLL")

        
    def add_before(self, data, x):
        if self.head is None:
            print("DLL is empty")
            return
        
        n = self.head
        if n.data == x:  
            self.add_begin(data)
            return

        while n is not None:
            if n.data == x:
                new_node = Node(data)
                new_node.nref = n
                new_node.pref = n.pref

                n.pref.nref = new_node
                n.pref = new_node
                return
            n = n.nref

        print(f"{x} is not found in DLL")
    
    def remove_begin(self):
        if self.head is None:
            print("DLL is empty")
            return
        
        if self.head.nref is None:
            self.head = None
            return
        else:
            self.head = self.head.nref
            self.head.prev = None
        
    def remove_end(self):
        if self.head is None:
            print("DLL is empty")
            return
        
        if self.head.nref is None:
            self.head = None
            return
        
        n = self.head
        while n.nref is not None:
            n = n.nref

        n.pref.nref = None
        n.pref = None

    def remove_value(self, x):
        if self.head is None:
            print("DLL is empty")
            return
        
        if self.head.data == x:
            if self.head.nref is None:
                self.head = None
            else:
                self.head = self.head.nref
                self.head.pref = None
            return

        n = self.head
        while n is not None:
            if n.data == x:

                if n.nref is None:
                    n.prev.nref = None
                else:
                    n.pref.nref = n.nref
                    n.nref.prev = n.pref
                return
            n = n.nref
        
        print(f"{x} is not found in DLL")
        


        




dl = DLL()

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
            "8. forward_travercel\n"
            "9. backward_travercel\n"
            "0. exit\n"
            "Enter choice: "
        )
    )

    if choice == 1:
        n = int(input("Enter value to add at begin: "))
        dl.add_begin(n)
    elif choice == 2:
        n = int(input("Enter value to add at end: "))
        dl.add_end(n)
    elif choice == 3:
        n = int(input("Enter new value: "))
        x = int(input("Enter existing value to insert after: "))
        dl.add_after(n, x)
    elif choice == 4:
        n = int(input("Enter new value: "))
        x = int(input("Enter existing value to insert before: "))
        dl.add_before(n, x)
    elif choice == 5:
        dl.remove_begin()
    elif choice == 6:
        dl.remove_end()
    elif choice == 7:
        x = int(input("Enter value to remove: "))
        dl.remove_value(x)
    elif choice == 8:
        dl.forward_traversal()
    elif choice == 9:
        dl.backward_traversal()
    elif choice == 0:
        print("Exiting...")
        break
    else:
        print("Invalid choice!")
