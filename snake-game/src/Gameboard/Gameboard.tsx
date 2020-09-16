import React, { Component } from "react";
import logo from "./logo.svg";
import "./Gameboard.css";

const XPOS_HEAD_START: number = 15;
const YPOS_HEAD_START: number = 15;
const XPOS_APPLE_START: number = Math.floor(Math.random() * Math.floor(30));
const YPOS_APPLE_START: number = Math.floor(Math.random() * Math.floor(30));

interface Props {
  nodes: [];
}

export default class Gameboard extends Component<Props> {
  play() {}

  render() {
    return (
      <div className="Grid">
        <button onClick={() => this.play()}> Start Playing</button>
      </div>
    );
  }
}

const createGrid = (xSize: number, ySize: number) => {
  const nodes = [];
  for (let row = 0; row < xSize; row++) {
    const currentcol = [];
    for (let col = 0; col < ySize; col++) {
      currentcol.push(createNode(row, col));
    }

    nodes.push(currentcol);
  }
  return nodes;
};

const createNode = (row: number, col: number) => {
  return {
    row,
    col,
    isHead: row === XPOS_HEAD_START && col === YPOS_HEAD_START,
    isBody: false,
    isApple: row === XPOS_APPLE_START && col === YPOS_APPLE_START,
    previousNode: null,
  };
};
