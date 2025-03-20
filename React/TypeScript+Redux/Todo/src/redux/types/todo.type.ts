export interface task {
  id: number;
  task: string;
  completed: boolean;
}

export interface Todo {
  todos: task[];
}
