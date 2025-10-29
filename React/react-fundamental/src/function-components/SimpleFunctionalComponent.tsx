import { useState } from "react";

export const SimpleFunctionalComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hi, There</h1>
      <p>This is a simple functional component</p>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};
