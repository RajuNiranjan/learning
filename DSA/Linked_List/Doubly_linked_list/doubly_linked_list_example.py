class Node:
    def __init__(self, data):
        self.data = data
        self.pref = None
        self.nref = None

class DLL:
    def __init__(self):
        self.head = None
    
    def forward_travercel(self):
        if self.head is None:
            print("DLL is Empty")
        else:
            n = self.head
            while n is not None:
                print(n.data, end=" ->")
                n = n.nref
                
    
    def backward_travercel(self):
        if self.head is None:
            print("DLL is Empty")
        else:
            n = self.head
            while n.ref is not None:
                n = n.nref
            while n is not None:
                print(n.data, end=" ->")
                n = n.pref

