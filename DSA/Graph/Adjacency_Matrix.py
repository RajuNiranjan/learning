from platform import node


nodes = []
graph = []
node_count = 0


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
    
def add_edge(v1, v2, cost):
    if v1 not in nodes:
        print(f'{v1} is not in Nodes')
    elif v2 not in nodes:
        print(f'{v2} not in nodes')
    else:
        idx1 = nodes.index(v1)
        idx2 = nodes.index(v2)
        graph[idx1][idx2] = cost
        graph[idx2][idx1] = cost


def delete_node(v):
    global node_count
    if v not in graph:
        return
    idx1 = nodes.index(v)
    node_count-=1
    nodes.remove(v)
    graph.pop(idx1)
    for i in graph:
        i.pop(idx1)

def print_graph():
    for i in range(node_count):
        for j in range(node_count):
            print(graph[i][j], end=' ')

print("Before adding nodes")
print(nodes)
print(graph)
add_node("A")
add_node("B")
add_node("C")
add_node("D")
add_edge("A","B", 15)
add_edge("C","D", 25)
add_edge("D","A", 55)
delete_node("C")
print("After adding nodes")
print(nodes)
print(graph)
print(print_graph())