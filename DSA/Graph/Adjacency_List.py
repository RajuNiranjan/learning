def add_node(v):
    if v in graph:
        return
    else:
        graph[v] = []

def add_edge(v1, v2):
    if v1 not in graph:
        return
    elif v2 not in graph:
        return
    else:
        graph[v1].append(v2)
        graph[v2].append(v1)

def delete_node(v):
    if v not in graph:
        return
    else:
        graph.pop(v)
        for i in graph:
            list1 = graph[i]
            if v in list1:
                list1.remove(v)

def add_weight_edge(v1, v2, cost):
    if v1 not in graph:
        return
    elif v2 not in graph:
        return
    else:
        list1 = [v2, cost]
        list2 = [v1, cost]
        graph[v1].append(list1)
        graph[v2].append(list2)

graph = {}
add_node("A")
add_node("B")
add_node("C")
add_weight_edge("A","B", 5)
add_edge("A","C")
delete_node("C")
print(graph)