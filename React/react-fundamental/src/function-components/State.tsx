import React, { useState } from "react";

export const State = React.memo(() => {
  console.log("state re-rendered");
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>State</h1>
      <div className="flex items-center gap-10">
        <button onClick={() => setCount(count - 1)}>-</button>
        <h1>{count}</h1>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
});
