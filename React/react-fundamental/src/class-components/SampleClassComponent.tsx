import React from "react";

export class SampleClassComponent extends React.Component {
  state = { count: 0 };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render(): React.ReactNode {
    return (
      <div>
        <h1>Hello There...</h1>
        <p>This is a Simple Class Component</p>
        <h1>{this.state.count}</h1>
        <button className="button" onClick={this.handleIncrement}>
          +
        </button>
      </div>
    );
  }
}
