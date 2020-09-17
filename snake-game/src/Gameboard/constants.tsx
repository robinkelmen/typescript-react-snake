import React, { Component } from "react";

export default interface node {
  row: number;
  col: number;
  isHead: boolean;
  isBody: boolean;
  isApple: boolean;
  previousNode?: node; // may implement snake like a linked list
}

const CANVAS_SIZE: number[] = [500, 500];
const SCALE: number = 25;
const XPOS_APPLE_START: number = Math.floor(
  Math.random() * (CANVAS_SIZE[0] / SCALE)
);
const YPOS_APPLE_START: number = Math.floor(
  Math.random() * (CANVAS_SIZE[1] / SCALE)
);

const APPLE_START = [XPOS_APPLE_START, YPOS_APPLE_START];

const SNAKE_START = [
  [15, 14],
  [15, 15],
];

const SPEED: number = 100;
const DIRECTIONS: {} = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
};
export { CANVAS_SIZE, SNAKE_START, APPLE_START, SCALE, SPEED, DIRECTIONS };
