import { useState } from "react";
import { ClassComponent } from "./components/ClassComponent";
import { FunctionalComponent } from "./components/FunctionalComponent";
import { FunctionalPureComponent } from "./components/FunctionalPureComponent";
import { ClassPureComponent } from "./components/ClassPureComponent";
import { ControlledComponents } from "./components/ControlledComponents";
import { UnControlledComponents } from "./components/UnControlledComponents";
import UseState from "./components/UseState";
import { UseEffect } from "./UseEffect";
import { UseMemo } from "./components/UseMemo";
import { UseCallBak } from "./components/UseCallBack";
import { UseReducer } from "./components/useReducer";

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
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">
          Controlled / Uncontrolled Components
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <ControlledComponents />
          <UnControlledComponents />
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">useState</h1>
        <div className="grid grid-cols-2 gap-4">
          <UseState />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">UseEffect</h1>
        <div className="grid grid-cols-2 gap-4">
          <UseEffect />
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">useMemo</h1>
        <div className="grid grid-cols-2 gap-4">
          <UseMemo />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">useCallback</h1>
        <div className="grid grid-cols-2 gap-4">
          <UseCallBak />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">useReducer</h1>
        <div className="grid grid-cols-2 gap-4">
          <UseReducer />
        </div>
      </div>
    </div>
  );
};

export default App;
