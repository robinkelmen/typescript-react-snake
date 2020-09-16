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
interface node {
  row: number;
  col: number;
  isHead: boolean;
  isBody: boolean;
  isApple: boolean;
  previousNode?: Snakenode;
}

export default class Gameboard extends Component<Props, { nodes: node[][] }> {
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
        <button className="button startbutt" onClick={() => this.play()}>
          Start Playing
        </button>
        {nodes.map((myrow, rowindex) => {
          return (
            <div key={rowindex} className="row">
              {myrow.map((node, nodeindex) => {
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
  console.log(YPOS_APPLE_START);
  console.log(XPOS_APPLE_START);
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
  const mynode: node = {
    row: row,
    col: col,
    isHead: row === XPOS_HEAD_START && col === YPOS_HEAD_START,
    isBody: false,
    isApple: row === XPOS_APPLE_START && col === YPOS_APPLE_START,
    previousNode: undefined,
  };

  return mynode;
};
