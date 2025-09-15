class Node:
    def __init__(self, data):
        self.data = data
        self.nref = None          


class CSLL:
    def __init__(self):
        self.head = None

    def display(self):
        if self.head is None:
            print("CSLL is empty")
            return
        n = self.head
        while True:
            print(n.data, end=' -> ')
            n = n.nref
            if n == self.head:
                break
        print("(HEAD)")

    def insert_empty(self, data):
        new_node = Node(data)
        new_node.nref = new_node
        self.head = new_node

    def add_begin(self, data):
        if self.head is None:
            self.insert_empty(data)
            return
        new_node = Node(data)
        tail = self.get_tail()
        new_node.nref = self.head
        tail.nref = new_node
        self.head = new_node

    def add_end(self, data):
        if self.head is None:
            self.insert_empty(data)
            return
        new_node = Node(data)
        tail = self.get_tail()
        tail.nref = new_node
        new_node.nref = self.head

    def add_after(self, data, x):
        if self.head is None:
            self.insert_empty(data)
            return
        n = self.head
        while True:
            if n.data == x:
                new_node = Node(data)
                new_node.nref = n.nref
                n.nref = new_node
                break
            n = n.nref
            if n == self.head:
                break

    def add_before(self, data, x):
        if self.head is None:
            self.insert_empty(data)
            return
        if self.head.data == x:
            self.add_begin(data)
            return
        n = self.head
        while True:
            if n.nref.data == x:
                new_node = Node(data)
                new_node.nref = n.nref
                n.nref = new_node
                break
            n = n.nref
            if n == self.head:
                break

    def remove_begin(self):
        if self.head is None:
            return
        if self.head.nref == self.head:      
            self.head = None
            return
        tail = self.get_tail()
        self.head = self.head.nref
        tail.nref = self.head

    def remove_end(self):
        if self.head is None:
            return
        if self.head.nref == self.head:
            self.head = None
            return
        prev = self.head
        while prev.nref.nref != self.head:   # node before tail
            prev = prev.nref
        prev.nref = self.head

    def remove_after(self, x):
        if self.head is None:
            return
        n = self.head
        while True:
            if n.data == x:
                target = n.nref
                if target == self.head and target.nref == self.head:
                    return
                n.nref = target.nref
                if target == self.head:
                    self.head = target.nref
                break
            n = n.nref
            if n == self.head:
                break

    def remove_before(self, x):
        if self.head is None:
            return
        # if x is at head, remove last node
        if self.head.data == x:
            self.remove_end()
            return
        prev = self.head
        while True:
            if prev.nref.nref.data == x:
                prev.nref = prev.nref.nref
                break
            prev = prev.nref
            if prev == self.head:
                break

    def remove_value(self, data):
        if self.head is None:
            return
        if self.head.data == data:
            self.remove_begin()
            return
        prev = self.head
        while True:
            if prev.nref.data == data:
                prev.nref = prev.nref.nref
                break
            prev = prev.nref
            if prev == self.head:
                break

    def get_tail(self):
        n = self.head
        while n.nref != self.head:
            n = n.nref
        return n


cll = CSLL()
cll.add_begin(10)
cll.add_begin(20)
cll.add_begin(30)
cll.display()

cll.add_end(40)
cll.add_end(50)
cll.add_end(60)
cll.display()

cll.add_after(5, 10)
cll.display()

cll.add_before(45, 50)
cll.display()

cll.remove_begin()
cll.display()

cll.remove_end()
cll.display()

cll.remove_after(40)
cll.display()

cll.remove_before(40)
cll.display()

cll.remove_value(40)
cll.display()
