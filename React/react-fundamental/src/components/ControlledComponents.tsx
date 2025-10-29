import React from "react";

export const ControlledComponents = () => {
  const [formData, setFromData] = React.useState("");
  return (
    <div className="flex flex-col gap-4">
      <h1>Controlled Component</h1>

      <form>
        <input
          type="text"
          value={formData}
          onChange={(e) => setFromData(e.target.value)}
          className="focus:outline-none border"
        />
      </form>

      <h1>O/P:{formData}</h1>
    </div>
  );
};
