export type Task = {
  id: number;
  task: string;
  completed: boolean;
};

export type TodoState = {
  todos: Task[];
  addTask: (task: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
};
