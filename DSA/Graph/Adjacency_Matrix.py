def add_node(v):
    global node_count
    if v in nodes:
        print(f'{v} already present in graph')
    else:
        node_count+=1
        nodes.append(v)
        for n in graph:
            n.append(0)
        temp = []
        for i in range(node_count):
            temp.append(0)
        graph.append(temp)

def print_graph():
    for i in range(node_count):
        for j in range(node_count):
            print(graph[i][j], end=' ')

nodes = []
graph = []
node_count = 0
print("Before adding nodes")
print(nodes)
print(graph)
add_node("A")
add_node("B")
add_node("A")
print("After adding nodes")
print(nodes)
print(graph)
print(print_graph())