def add_node(v):
    if v in graph:
        return
    else:
        graph[v] = []


graph = {}
add_node("A")
add_node("B")
add_node("C")
print(graph)