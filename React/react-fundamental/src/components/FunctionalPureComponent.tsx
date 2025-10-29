/*

Pure component --- means the component that prevents the unnecessary re-renders when the state or prop didn't changed

for the function component there is no PureComponent like class component
but we can get the same by useing the React.meme

*/

import React from "react";
interface FunctionalPureComponentProps {
  count: number;
  setCount: (val: number) => void;
}
export const FunctionalPureComponent: React.FC<FunctionalPureComponentProps> =
  React.memo(({ count, setCount }) => {
    console.log("Functional Component Re-Redering");
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
  });
