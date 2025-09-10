class Node:
    def __init__(self, data):
        self.data = data
        self.ref = None
    
class LinkedList:
    def __init__(self):
        self.head = None
    
    def print_LL(self):
        if self.head is None:
            print("LinkedList is Empty!")
        else:
            n = self.head
            while n is not None:
                print(n.data, end=' -> ')
                n = n.ref
            print("Null")
    
    def add_begin(self, data):
        new_node=Node(data)
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
            
    
    def add_after(self, data, x):  # x is a after node info
        n = self.head
        while n is not None:
            if x == n.data:
                break
            n = n.ref
        if n is None:
            print(f'{x} Node is Not Present in Linked List')
        else:
            new_node = Node(data)
            new_node.ref = n.ref
            n.ref = new_node

    def add_before(self, data, x):
        if self.head is None:
            print("Linked List is Empty!")
            return

        if self.head.data == x:
            new_node = Node(data)
            new_node.ref = self.head
            self.head = new_node
            return

        n = self.head
        while n.ref is not None:
            if n.ref.data == x:
                new_node = Node(data)
                new_node.ref = n.ref
                n.ref = new_node
                return
            n = n.ref

        print(f"{x} is not in Linked List")




    def insert_empty(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            print("Linked list is not empty!")
        
    def remove_begin(self):
        if self.head is None:
            print("Linked List is Empty!")
            return
        else:
            print(f'{self.head.data} removed')
            self.head = self.head.ref



LL1 = LinkedList()

LL1.add_begin(10)
LL1.add_begin(20)
LL1.add_begin(30)
LL1.add_end(70)
LL1.add_end(80)
LL1.add_end(90)
LL1.add_after(40, 10)
LL1.add_before(190, 40)
LL1.insert_empty(1)
LL1.remove_begin()

LL1.print_LL()
