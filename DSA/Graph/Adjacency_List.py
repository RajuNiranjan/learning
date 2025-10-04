def add_node(v):
    if v not in graph:
        graph[v] = []

def add_edge(v1, v2, cost=1):
    if v1 not in graph or v2 not in graph:
        return
    if (v2, cost) not in graph[v1]:
        graph[v1].append((v2, cost))
    if (v1, cost) not in graph[v2]:
        graph[v2].append((v1, cost))

def add_weight_edge(v1, v2, cost):
    add_edge(v1, v2, cost)

def delete_edge(v1, v2):
    if v1 not in graph or v2 not in graph:
        return
    graph[v1] = [(n, c) for (n, c) in graph[v1] if n != v2]
    graph[v2] = [(n, c) for (n, c) in graph[v2] if n != v1]

def delete_node(v):
    if v not in graph:
        return
    for node in list(graph.keys()):
        graph[node] = [(n, c) for (n, c) in graph[node] if n != v]
    graph.pop(v)

graph = {}
add_node("A")
add_node("B")
add_node("C")
add_weight_edge("A", "B", 5)
add_edge("A", "C")
delete_node("C")
delete_edge("A", "B")
print(graph)
