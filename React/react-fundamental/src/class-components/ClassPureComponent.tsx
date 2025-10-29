import React from "react";

interface pops {
  name: string;
}
export class ClassPureComponent extends React.PureComponent<pops> {
  render() {
    console.log("Class Pure Component Rerendered");
    const { name } = this.props;
    return (
      <div>
        <h1>Class Pure Component</h1>
        {name}
      </div>
    );
  }
}
