class Node:
    def __init__(self, data):
        self.data = data
        self.pref = None
        self.nref = None

class CDLL:
    def __init__(self):
        self.head = None

    
    def display(self):
        if self.head is None:
            print("CDLL is empty")
            return
        n = self.head
        while True:
            print(n.data, end=' -> ')
            n = n.nref
            if n == self.head:
                break
        print("(HEAD)")
    
    def insert_empty(self, data):
        if self.head is None:
            new_node = Node(data)
            new_node.nref = new_node
            new_node.pref = new_node
            self.head = new_node
            return
            
    def add_begin(self, data):
        if self.head is None:
            self.insert_empty(data)
            return
        
        new_node = Node(data)
        tail = self.head.pref
        new_node.nref = self.head
        new_node.pref = tail
        tail.nref = new_node
        self.head = new_node
        return
    
    def add_end(self, data):
        if self.head is None:
            self.insert_empty(data)
            return
        
        tail = self.head.pref

        new_node = Node(data)

        new_node.nref = self.head
        new_node.pref = tail
        self.head.pref = new_node
        tail.nref = new_node
        return 
    
    def add_after(self, data, x):
        if self.head is None:
            self.insert_empty(data)
            return
        
        cn = self.head
        while True:
            if cn.data == x:
                new_node = Node(data)
                new_node.nref = cn.nref
                new_node.pref = cn
                cn.nref = new_node
                cn.nref.pref = new_node
                break
            cn = cn.nref
            if cn == self.head:
                break

    def add_before(self, data, x):
        if self.head is None:
            self.insert_empty(data)
            return

        cn = self.head
        while True:
            if cn.data == x:
                new_node = Node(data)
                new_node.nref = cn
                new_node.pref = cn.pref
                cn.pref.nref = new_node     
                cn.pref = new_node
                if cn == self.head:         
                    self.head = new_node
                break
            cn = cn.nref
            if cn == self.head:
                break

    def remove_begin(self):
        if self.head is None:
            return
        
        if self.head.nref == self.head:
            self.head = None
            return

        next_node = self.head.nref
        tail = self.head.pref

        next_node.pref = tail
        tail.nref = next_node
        self.head = next_node
    
    
    def remove_end(self):
        if self.head is None:
            return
        
        if self.head.nref == self.head:
            self.head = None
            return
        cn = self.head
        while True:
            if cn.nref == self.head:
                prev_node = cn.pref
                prev_node.nref = self.head
                self.head.pref = prev_node
                break
            cn = cn.nref

    def remove_after(self, x):
        if self.head is None:
            return
        
        cn = self.head
        while True:
            if cn.data == x:
                next_node = cn.nref
                if next_node == self.head and next_node.nref == self.head:
                    return
                cn.nref = next_node.nref
                next_node.nref.pref = cn

                if next_node == self.head:
                    self.head = next_node.nref
                break
            cn = cn.nref

    def remove_before(self, x):
        if self.head is None:
            return
        
        cn = self.head
        while True:
            if cn.data == x:
                prev_node = cn.pref.pref
                cn.pref = prev_node
                prev_node.nref = cn
                break
            cn = cn.nref
                
    def remove_value(self, data):
        if self.head is None:
            return
        
        cn = self.head
        while True:
            if cn.data == data:
                prev_node = cn.pref
                next_node = cn.nref
                
                prev_node.nref = next_node
                next_node.pref = prev_node

                if cn == self.head:
                    if cn.nref == self.head:
                        self.head = None
                    else:
                        self.head = next_node

                break
            cn = cn.nref
            if cn == self.head:
                break







cll = CDLL()
cll.add_begin(10)
cll.add_begin(20)
cll.add_begin(30)
cll.add_end(40)
cll.add_end(50)
cll.add_end(60)
cll.add_after(5, 10)
cll.add_before(45,50)
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