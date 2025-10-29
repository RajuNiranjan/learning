import { ContextTodo } from "./components/ContextTodo";
import ReduxTodo from "./components/ReduxTodo";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="grid grid-cols-3">
      <Todo />
      <ContextTodo />
      <ReduxTodo />
    </div>
  );
}

export default App;
