import React from "react";

export const UnControlledComponents = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState("");

  const handleShowValue = () => {
    if (inputRef.current) {
      setValue(inputRef.current.value);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>Uncontrolled Component</h1>

      <form>
        <input
          type="text"
          ref={inputRef}
          className="focus:outline-none border px-2 py-1"
        />
      </form>

      <button
        type="button"
        onClick={handleShowValue}
        className="bg-black text-white px-4 py-1 font-bold w-fit"
      >
        Show Value
      </button>

      <h1>O/P: {value}</h1>
    </div>
  );
};
