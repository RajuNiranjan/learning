/*
1. class Component is ES6 extends React.Component.
2. state is manages by this.state and this.setState.
3. uses the render() method to return the JSX
4. uses lifecycle methods like componentDidMount, ComponentDidUpdate, ComponentDidUnmount
*/

import type { ReactNode } from "react";
import React from "react";

export class ClassComponent extends React.Component {
  render(): ReactNode {
    return (
      <div>
        <h1>Welcome to Class Component</h1>
      </div>
    );
  }
}
