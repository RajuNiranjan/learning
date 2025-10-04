graph = {}

def add_node(v, edges=None):
    if v not in graph:
        graph[v] = []
    if edges:
        for (neighbor, cost) in edges:
            add_edge(v, neighbor, cost)

def add_edge(v1, v2, cost=1):
    if v1 not in graph:
        add_node(v1)
    if v2 not in graph:
        add_node(v2)

    if (v2, cost) not in graph[v1]:
        graph[v1].append((v2, cost))
    if (v1, cost) not in graph[v2]:
        graph[v2].append((v1, cost))

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

def DFS(node, visited=None):
    if visited is None:
        visited = set()
    if node not in visited:
        print(node)
        visited.add(node)
        for (neighbor, _) in graph.get(node, []):
            DFS(neighbor, visited)
    return visited

def DFS_iterative(node):
    visited = set()
    if node not in graph:
        return
    stack = [node]
    while stack:
        current = stack.pop()
        if current not in visited:
            print(current)
            visited.add(current)
            # push only neighbor nodes (not cost)
            for (neighbor, _) in graph.get(current, []):
                if neighbor not in visited:
                    stack.append(neighbor)
    return visited


# Example usage
add_node("A", [("B", 5), ("C", 2)])
add_node("B", [("D", 1)])
add_node("E")  
add_edge("E", "F", 3)

print("Graph:", graph)
print("\nRecursive DFS from A:")
DFS("A")

print("\nIterative DFS from A:")
DFS_iterative("A")
