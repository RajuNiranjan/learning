import React, { useCallback } from "react";

export const UseCallBak = () => {
  const [count, setCount] = React.useState(0);

  const increment = useCallback(() => {
    console.log("Rerendered");
    setCount(count + 1);
  }, [count]);

  return (
    <div>
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
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
};
