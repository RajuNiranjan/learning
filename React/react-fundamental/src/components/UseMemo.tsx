import React, { useMemo, useState } from "react";

export const UseMemo = () => {
  const [count, setCount] = React.useState(0);
  const [num] = useState(5);

  const square = useMemo(() => {
    console.log("Calculating...");
    return count * num;
  }, [count, num]);

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
        <p>{square}</p>
        <button
          className="h-10 w-10 bg-black text-white font-bold cursor-pointer"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};
