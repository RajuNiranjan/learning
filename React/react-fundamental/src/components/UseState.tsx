import React from "react";

const UseState = () => {
  const [count, setCount] = React.useState(0);
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
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default UseState;
