import React, { Component } from "react";
import "./Gameboard.css";
import Snakenode from "./Snakebody/Snakenode";

const XPOS_HEAD_START: number = 15;
const YPOS_HEAD_START: number = 15;
const XPOS_APPLE_START: number = Math.floor(Math.random() * Math.floor(30));
const YPOS_APPLE_START: number = Math.floor(Math.random() * Math.floor(30));

interface Props {
  nodes: [];
}

export default class Gameboard extends Component<Props, { nodes: {}[][] }> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  play() {}

  componentDidMount() {
    console.log(this.state);
    const nodes = createGrid(30, 30);
    console.log(nodes);
    this.setState({ nodes });
    console.log(this.state);
  }

  render() {
    const { nodes } = this.state;
    return (
      <div className="Grid">
        <button onClick={() => this.play()}> Start Playing</button>
        {nodes.map((myrow, rowindex) => {
          return (
            <div key={rowindex}>
              {myrow.map((node: {}, nodeindex) => {
                console.log(node);
                const {
                  row,
                  col,
                  isHead,
                  isBody,
                  isApple,
                  previousNode,
                } = node;

                return (
                  <Snakenode
                    key={nodeindex}
                    xPos={row}
                    yPos={col}
                    isHead={isHead}
                    isBody={isBody}
                    isApple={isApple}
                    previousNode={previousNode}
                  ></Snakenode>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const createGrid = (xSize: number, ySize: number) => {
  const nodes = [];
  for (let row = 0; row < xSize; row++) {
    const currentrow = [];
    for (let col = 0; col < ySize; col++) {
      currentrow.push(createNode(row, col));
    }

    nodes.push(currentrow);
  }
  return nodes;
};

const createNode = (row: number, col: number) => {
  const node: {} = {
    row,
    col,
    isHead: row === XPOS_HEAD_START && col === YPOS_HEAD_START,
    isBody: false,
    isApple: row === XPOS_APPLE_START && col === YPOS_APPLE_START,
    previousNode: null,
  };
  return node;
};
