import { useState } from "react";
import { ClassComponent } from "./components/ClassComponent";
import { FunctionalComponent } from "./components/FunctionalComponent";
import { FunctionalPureComponent } from "./components/FunctionalPureComponent";
import { ClassPureComponent } from "./components/ClassPureComponent";

const App = () => {
  const [funCount, setFunCount] = useState(0);
  const [classCount, setClassCount] = useState(0);

  return (
    <div className="p-10 space-y-10">
      {/* components  */}
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">Components</h1>
        <div className="grid grid-cols-2 gap-4">
          <ClassComponent />
          <FunctionalComponent />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">Pure Components</h1>
        <div className="grid grid-cols-2 gap-4">
          <ClassPureComponent count={classCount} setCount={setClassCount} />
          <FunctionalPureComponent count={funCount} setCount={setFunCount} />
        </div>
      </div>
    </div>
  );
};

export default App;
