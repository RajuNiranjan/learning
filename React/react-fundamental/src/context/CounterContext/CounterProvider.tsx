import React from "react";
import { CounterContext } from "./ConterContext";

export const CounterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = React.useState(0);

  function increment() {
    return setCount(count + 1);
  }

  function decrement() {
    return setCount(count - 1);
  }

  function reset() {
    return setCount(0);
  }

  const v = {
    count,
    increment,
    decrement,
    reset,
  };

  return (
    <CounterContext.Provider value={v}>{children}</CounterContext.Provider>
  );
};
