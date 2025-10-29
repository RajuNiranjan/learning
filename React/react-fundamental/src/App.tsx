import { ClassComponent } from "./components/ClassComponent";
import { FunctionalComponent } from "./components/FunctionalComponent";

const App = () => {
  return (
    <div className="p-10">
      {/* components  */}
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">Components</h1>
        <div className="grid grid-cols-2 gap-4">
          <ClassComponent />
          <FunctionalComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
