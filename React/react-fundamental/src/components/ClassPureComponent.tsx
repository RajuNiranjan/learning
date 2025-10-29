/*
Pure component in react is like it prevents the unnecessary re-rendering when the props or state didn't changes

so in the class component the handles by React.PureComponent

but in the functional component PureComponent is not available so we can do the same with the using React.memo
*/

import React from "react";

interface ClassPureComponentProps {
  count: number;
  setCount: (val: number) => void;
}

export class ClassPureComponent extends React.PureComponent<ClassPureComponentProps> {
  render(): React.ReactNode {
    const { count, setCount } = this.props;
    console.log("class component Re-Renders");
    return (
      <div>
        <h1>Functional Pure Component</h1>
        <div className="flex items-center justify-center gap-4">
          <button
            className="h-10 w-10 bg-black text-white font-bold cursor-pointer"
            onClick={() => setCount(count - 1)}
          >
            -
          </button>
          <h1 className="text-xl">{count}</h1>
          <button
            className="h-10 w-10 bg-black text-white font-bold cursor-pointer"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}
