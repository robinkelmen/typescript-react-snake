import React, { Component } from "react";
import "./Snakenode.css";

interface node {
  row: number;
  col: number;
  isHead: boolean;
  isBody: boolean;
  isApple: boolean;
  previousNode?: node; // may implement snake like a linked list
}
interface Props {
  xPos: number;
  yPos: number;
  isHead: boolean;
  isBody: boolean;
  isApple: boolean;
  previousNode?: node;
}

export default class Snakenode extends Component<Props> {
  handleClick() {
    console.log("[" + this.props.xPos + "," + this.props.yPos + "]");
  }
  render() {
    const { xPos, yPos, isHead, isBody, isApple } = this.props;
    const className = isHead
      ? "node_head"
      : isApple
      ? "node_apple"
      : isBody
      ? "node_body"
      : "";
    return (
      <div
        id={`node-${xPos}-${yPos}`}
        className={`node ${className}`}
        onClick={() => this.handleClick()}
      ></div>
    );
  }
}
