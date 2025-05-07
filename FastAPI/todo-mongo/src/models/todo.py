

def todo_serializer(todo) -> dict:
    return{
        "id": str(todo["_id"]),
        "title": todo["title"],
        "completed": todo.get("completed", False)  
    }

def todos_serializer(todos) -> list:
    return [todo_serializer(todo) for todo in todos]
