import React, { useState, useEffect, useRef, Component } from "react";
import "./Gameboard.css";
import { useInterval } from "./useInterval";

import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "./constants";
interface Props {
  nodes: [];
}
const Gameboard: React.FC = () => {
  const canvasRef = useRef(null);

  const [snake, setSnake] = useState(SNAKE_START);

  const [apple, setApple] = useState(APPLE_START);
  const startdir = [0, -1];
  const [dir, setDir] = useState(startdir);
  const [points, setPoints] = useState(0);

  const [speed, setSpeed] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [snakeColor, setSnakeColor] = useState("pink");
  const [appleColor, setAppleColor] = useState("lightblue");
  const [canvasColor, setCanvasColor] = useState(""); // going to change class

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    setSnakeColor("grey");
  };

  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };
  const randColor = () => {
    const r = Math.floor(Math.random() * 254);
    const g = Math.floor(Math.random() * 254);
    const b = Math.floor(Math.random() * 254);
    return `rgb(${r},${g}, ${b})`;
  };

  const checkAppleCollision = (newSnake) => {
    var pointsCur = JSON.parse(JSON.stringify(points));
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      pointsCur++;
      setPoints(pointsCur);
      setSnakeColor(randColor());
      setAppleColor(randColor());
      if (pointsCur % 5 === 0) {
        setCanvasColor("crazy");
        setSpeed(50);
      } else {
        setCanvasColor("");
        setSpeed(SPEED);
      }
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));

    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) {
      snakeCopy.pop();
    } else {
    }
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setPoints(0);
    setGameOver(false);
    setAppleColor(randColor());
    setSnakeColor(randColor());
    setCanvasColor("");
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = snakeColor;
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = appleColor;
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver, points]);

  useInterval(() => gameLoop(), speed);

  document.onkeydown = moveSnake;

  return (
    <div role="button" className="Grid">
      {
        <button className="button startbutt" onClick={startGame}>
          Start Game
        </button>
      }
      {<div className="points">You have {points} points</div>}

      <canvas
        className={`${canvasColor}`}
        style={{ border: "1px solid black" }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      ></canvas>
      {gameOver && <div className="blinking">GAME OVER!</div>}
    </div>
  );
};

export default Gameboard;
