import React from "react";

export const Props = React.memo(({ name }: { name: string }) => {
  console.log("Porp re-rendered");
  return (
    <div>
      <h1>Prop</h1>
      <h1>My Name is {name}</h1>
    </div>
  );
});
