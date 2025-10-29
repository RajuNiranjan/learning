import React from "react";
import { SampleClassComponent } from "./class-components/SampleClassComponent";
import { SimpleFunctionalComponent } from "./function-components/SimpleFunctionalComponent";
import { ClassPureComponent } from "./class-components/ClassPureComponent";
import { FunctionPureComponent } from "./function-components/FunctionPureComponent-React.memo";
import { State } from "./function-components/State";
import { Props } from "./function-components/Props";

const App = () => {
  const name = "John Doe";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-10 space-y-12">
      {/* Components Section */}
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Components</h1>
          <p className="text-gray-600">Class and Functional Components</p>
        </div>

        <div className="flex flex-wrap items-center justify-around gap-6">
          <SampleClassComponent />
          <SimpleFunctionalComponent />
        </div>
      </section>

      {/* Pure Components Section */}
      <section className="space-y-6">
        <h1 className="text-2xl font-bold text-blue-700">Pure Components</h1>

        <div className="flex flex-wrap items-center justify-around gap-6">
          <ClassPureComponent name={name} />
          <FunctionPureComponent name={name} />
        </div>
      </section>

      {/* State and Props Section */}
      <section className="space-y-6">
        <h1 className="text-2xl font-bold text-blue-700">State and Props</h1>

        <div className="flex flex-wrap items-center justify-around gap-6">
          <State />
          <Props name="John Wick" />
        </div>
      </section>
    </div>
  );
};

export default App;
