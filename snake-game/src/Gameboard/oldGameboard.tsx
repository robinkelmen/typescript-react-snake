import React, { Component, useState, useEffect, useRef } from "react";
import { KeyboardEvent } from "react";
import "./Gameboard.css";
import Snakenode from "./Snakebody/Snakenode";
import node from "./constants";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "./constants";

const XPOS_HEAD_START: number = 15;
const YPOS_HEAD_START: number = 15;
const XPOS_APPLE_START: number = Math.floor(Math.random() * Math.floor(30));
const YPOS_APPLE_START: number = Math.floor(Math.random() * Math.floor(30));

interface Props {
  nodes: [];
}

export default class Gameboard extends Component<
  Props,
  { nodes: node[][]; snake: node[]; direction: string }
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nodes: [],
      snake: [],
      direction: "UP",
    };
  }

  play() {
    while (1) {
      this.snakeMove();
    }
  }
  buildSnake() {
    const { snake } = this.state;
    for (let i: number = 0; i < snake.length; i++) {
      setTimeout(() => {
        const node = snake[i];
        console.log(node);

        const x: Element | null = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (x) {
          x.className = "node node_body";
        } else {
        }
      }, 50 * i);
    }
  }

  snakeMove() {
    const { snake } = this.state;
    const len = snake.length;
    let head: any = null;
    let headnode = snake[len - 1];
    //console.log("here");
    //console.log(this.state.direction);
    switch (this.state.direction) {
      case "RIGHT":
        head = {
          row: headnode.row,
          col: headnode.col + 1,
          isHead: true,
          isBody: true,
          isApple: false,
          previousNode: snake[len - 2],
        };

        break;
      case "LEFT":
        head = {
          row: headnode.row,
          col: headnode.col - 1,
          isHead: true,
          isBody: true,
          isApple: false,
          previousNode: snake[len - 2],
        };
        break;
      case "DOWN":
        head = {
          row: headnode.row + 1,
          col: headnode.col,
          isHead: true,
          isBody: true,
          isApple: false,
          previousNode: snake[len - 2],
        };
        break;
      case "UP":
        head = {
          row: headnode.row - 1,
          col: headnode.col,
          isHead: true,
          isBody: true,
          isApple: false,
          previousNode: snake[len - 2],
        };
        break;
    }
    snake.push(head);
    snake.shift();

    this.setState({ snake });
    this.buildSnake();
  }

  onKeyDown = (e: any) => {
    switch (e.keyCode) {
      case 38:
        this.setState({
          direction: "UP",
        });
        console.log("up");
        break;
      case 40:
        this.setState({
          direction: "DOWN",
        });
        console.log("down");
        break;
      case 37:
        this.setState({
          direction: "LEFT",
        });
        console.log("LEFT");
        break;
      case 39:
        this.setState({
          direction: "RIGHT",
        });
        console.log("right");
        break;
    }
  };

  componentDidMount() {
    const nodes = createGrid(30, 30);
    const head: node = nodes[XPOS_HEAD_START][YPOS_HEAD_START];
    const snake: node[] = [];
    snake.push(head);
    this.setState({ nodes, snake });
    document.onkeydown = this.onKeyDown;
  }

  render() {
    const { nodes } = this.state;
    return (
      <div className="Grid">
        <button className="button startbutt" onClick={() => this.play()}>
          Start Playing
        </button>
        <div className="container">
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
