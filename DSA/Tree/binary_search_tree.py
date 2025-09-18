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
        return self.rchild.search(data) if self.rchild else False

    def preorder(self):
        if self.key is None:
            return []
        result = [self.key]
        if self.lchild:
            result.extend(self.lchild.preorder())
        if self.rchild:
            result.extend(self.rchild.preorder())
        return result

    def inorder(self):
        if self.key is None:
            return []
        result = []
        if self.lchild:
            result.extend(self.lchild.inorder())
        result.append(self.key)
        if self.rchild:
            result.extend(self.rchild.inorder())
        return result

    def postorder(self):
        if self.key is None:
            return []
        result = []
        if self.lchild:
            result.extend(self.lchild.postorder())
        if self.rchild:
            result.extend(self.rchild.postorder())
        result.append(self.key)
        return result
    
    def delete(self, data):
        if self.key is None:
            return
        
        if self.key > data:
            if self.lchild:
                self.lchild = self.lchild.delete(data)
        
        elif self.key < data:
            if self.rchild:
                self.rchild = self.rchild.delete(data)
        
        else:
            if self.lchild is None:
                return self.rchild
            
            if self.rchild is None:
                return self.lchild
            
            successor = self.rchild
            while successor.lchild:
                successor = successor.lchild
            
            self.key = successor.key
            self.rchild = self.rchild.delete(successor.key)
        
        return self

    def height(self):
        if self.key is None: return 0
        l_height = self.lchild.height() if self.lchild else 0
        r_height = self.rchild.height() if self.rchild else 0
        return max(l_height, r_height) + 1
    
    def find_min(self):
        current = self
        while current.lchild:
            current = current.lchild
        return current.key
    
    def find_max(self):
        current = self
        while current.rchild:
            current = current.rchild
        return current.key
                

    def pretty_tree(self, prefix="", is_left=True):
        if self.rchild:
            self.rchild.pretty_tree(prefix + ("|   " if is_left else "    "), False)
        print(prefix + ("+-- " if is_left else "+-- ") + str(self.key))
        if self.lchild:
            self.lchild.pretty_tree(prefix + ("    " if is_left else "|   "), True)


if __name__ == "__main__":
    root = BST()
    for val in [100, 10, 55, 69, 200, 75, 23, 91, 155, 169]:
        root.insert(val)

    print(root.search(8))
    print(root.search(15))
    print("Preorder :", root.preorder())
    print("Inorder  :", root.inorder())
    print("Postorder:", root.postorder())
    print("\nTree Structure:")
    print('\n Tree Height', root.height())
    root.pretty_tree()
    root.delete(55)
    print("Preorder :", root.preorder())
    print("Inorder  :", root.inorder())
    print("Postorder:", root.postorder())
    print("\nTree Structure:")
    print('\n Tree Height', root.height())
    print('\n Min Value', root.find_min())
    print('\n Max Value', root.find_max())
    root.pretty_tree()
