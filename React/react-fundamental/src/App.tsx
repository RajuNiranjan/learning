import React from "react";
import { SampleClassComponent } from "./class-components/SampleClassComponent";
import { SimpleFunctionalComponent } from "./function-components/SimpleFunctionalComponent";

const App = () => {
  return (
    <div className="flex items-center justify-around">
      <SampleClassComponent />
      <SimpleFunctionalComponent />
    </div>
  );
};

export default App;
