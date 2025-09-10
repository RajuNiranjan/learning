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


LL1 = LinkedList()

LL1.add_begin(10)
LL1.add_begin(20)
LL1.add_begin(30)
LL1.add_end(70)
LL1.add_end(80)
LL1.add_end(90)
LL1.add_after(40, 10)

LL1.print_LL()
