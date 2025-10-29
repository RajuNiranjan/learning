import React from "react";

export const FunctionPureComponent = React.memo(
  ({ name }: { name: string }) => {
    console.log("Function Component Rerendered");
    return (
      <div>
        This is from Functional Pure Component
        <h1>{name}</h1>
      </div>
    );
  }
);
