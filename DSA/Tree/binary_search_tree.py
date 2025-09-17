class BST:
    def __init__(self, key=None):     
        self.key = key
        self.lchild = None
        self.rchild = None

    def insert(self, data):
        if self.key is None:
            self.key = data
            return

        if data < self.key:
            if self.lchild:
                self.lchild.insert(data)
            else:
                self.lchild = BST(data)
        elif data > self.key:
            if self.rchild:
                self.rchild.insert(data)
            else:
                self.rchild = BST(data)

    def search(self, data):
        if self.key is None:
            return False

        if self.key == data:
            print("Node found!")
            return True

        if data < self.key:
            return self.lchild.search(data) if self.lchild else False
        else:
            return self.rchild.search(data) if self.rchild else False


# ---- Usage ----
root = BST()
for val in [10, 5, 20, 4, 8]:
    root.insert(val)

print(root.search(8))   
print(root.search(15)) 
