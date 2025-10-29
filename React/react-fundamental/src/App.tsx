import React from "react";
import { SampleClassComponent } from "./class-components/SampleClassComponent";
import { SimpleFunctionalComponent } from "./function-components/SimpleFunctionalComponent";
import { ClassPureComponent } from "./class-components/ClassPureComponent";
import { FunctionPureComponent } from "./function-components/FunctionPureComponent-React.memo";

const App = () => {
  const name = "John Doe";
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-around">
        <SampleClassComponent />
        <SimpleFunctionalComponent />
      </div>

      <div className="flex items-center justify-around">
        <ClassPureComponent name={name} />
        <FunctionPureComponent name={name} />
      </div>
    </div>
  );
};

export default App;
