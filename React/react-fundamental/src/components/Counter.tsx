import { useCounter } from "../context/CounterContext/useCounter";

export const Counter = () => {
  const { count, increment, decrement } = useCounter();
  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <button
          className="h-10 w-10 bg-black text-white font-bold cursor-pointer"
          onClick={decrement}
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
